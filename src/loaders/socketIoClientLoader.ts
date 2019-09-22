import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import NodeRSA from 'node-rsa';
import io from 'socket.io-client';
import { Container } from 'typedi';

import { ChargeState } from '../api/models/telematics/ChargeState';
import { DriveState } from '../api/models/telematics/DriveState';
import { VehicleData } from '../api/models/telematics/VehicleData';
import { ChargeStateService } from '../api/services/ChargeStateService';
import { DriveStateService } from '../api/services/DriveStateService';
import { VehicleDataService } from '../api/services/VehicleDataService';
import { env } from '../env';

export const socketIoClientLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const vehicleDataService = Container.get<VehicleDataService>(VehicleDataService);
        const driveStateService = Container.get<DriveStateService>(DriveStateService);
        const chargeStateService = Container.get<ChargeStateService>(ChargeStateService);

        const key = new NodeRSA(env.schedulerModule.socketPrivateKey);
        const encrypted = key.encrypt(env.schedulerModule.socketKey, 'base64');
        console.log('encrypted: ', encrypted);

        const socket = io(env.schedulerModule.socketBase, {
            path: env.schedulerModule.socketEndpoint,
            reconnection: true,
            reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
            socket.emit('authentication', {key1: encrypted});
            console.log('============ connected ==========' );
        });
        socket.on('vehicleData', ( data: any) => {
            try {
                console.log(data);
                const userId: string = data.vehicleData.userId;
                const messageId: string = data.id;
                const vehicleDataRaw = data.vehicleData.vehicle;
                const vehicleData: VehicleData = vehicleDataRaw as VehicleData;
                vehicleData.userId = userId;
                console.log('==========>>>> saving vehicle data: ' + vehicleData.id);
                vehicleDataService.save(vehicleData);
                socket.emit('confirm', messageId);
            } catch ( error ) {
                console.log('error while saving vehicle data: ' + error );
            }
        });

        socket.on('driveState', ( data: any) => {
            try {
                console.log(data);
                const userId: string = data.driveState.userId;
                const messageId: string = data.id;
                const driveStateRaw = data.driveState.driveState;
                const driveState: DriveState = driveStateRaw as DriveState;
                vehicleDataService.findOneWithVin(userId, driveState.vin)
                .then( async (vehicleData: VehicleData) => {
                    if (vehicleData === undefined) {
                        console.log('==========>>>> vehicleData pncvgjfn undefined ');
                    } else {
                        driveState.vehicleData = vehicleData;
                        console.log('==========>>>> saving drive state: ' + driveState.id);
                        await driveStateService.save(driveState);
                        socket.emit('confirm', messageId);
                    }
                })
                .catch (( error ) => {
                    console.log('error while saving drive state data from schedular module via websocket: ' + error);
                });

            } catch ( error ) {
                console.log('error while saving drive state data from schedular module via websocket 2: ' + error);
            }
        });

        socket.on('chargeState', ( data: any) => {

            try {
                console.log(data);
                const userId: string = data.chargeState.userId;
                const messageId: string = data.id;
                const chargeStateRaw = data.chargeState.chargeState;
                const chargeState: ChargeState = chargeStateRaw as ChargeState;
                vehicleDataService.findOneWithVin(userId, chargeState.vin)
                .then( async (vehicleData: VehicleData) => {
                    chargeState.vehicleData = vehicleData;
                    console.log('==========>>>> saving chargeState : ' + chargeState.id);
                    chargeStateService.save(chargeState);
                    socket.emit('confirm', messageId);
                })
                .catch (( error ) => {
                    console.log('error while saving charge state data from schedular module via websocket: ' + error);
                });

            } catch ( error ) {
                console.log('error while saving charge state data from schedular module via websocket 2: ' + error);
            }
        });

        socket.on('clientEvent', (data: any) => {
            console.log('message from the server:' + data);
            socket.emit('serverEvent', 'thanks server! for sending ' + data );
        });
        socket.on('disconnect', (reason: any) => {
            console.log('auto connect for this reason: ' + reason);
            socket.open();
        });

        socket.on('connect_error', (error: any) => {
            console.log('error from the server:' + error);
        });

        socket.on('error', (error: any) => {
            console.log('error from the server:' + error);
        });
    }
};
//CRO-7496-GELS
