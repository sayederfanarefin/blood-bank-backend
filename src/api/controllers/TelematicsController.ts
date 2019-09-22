import { Authorized, Body, JsonController, Post } from 'routing-controllers';

import { ChargeState } from '../models/telematics/ChargeState';
import { DriveState } from '../models/telematics/DriveState';
import { VehicleData } from '../models/telematics/VehicleData';
import { ChargeStateService } from '../services/ChargeStateService';
import { DriveStateService } from '../services/DriveStateService';
import { VehicleDataService } from '../services/VehicleDataService';

@Authorized()
@JsonController('/telematics')
export class TelematicsController {

    constructor(
        private vehicleDataService: VehicleDataService,
        private driveStateService: DriveStateService,
        private chargeStateService: ChargeStateService
    ) { }

    @Post('/push/vehicle')
    public async pushVehicle(@Body() vehicleData: VehicleData): Promise<boolean> {
        console.log ('==>>> received push: ' + vehicleData.toString());
        return await this.vehicleDataService.save (vehicleData)
        .then( ( vehicleData2: VehicleData ) => {
            if ( vehicleData2 === undefined) {
                return false;
            } else {
                return true;
            }
        })
        .catch( ( error ) => {
            console.log ('==>>> received push (error): ' + error);
            return false;
        });
    }

    @Post('/push/charge')
    public async pushChargerState(@Body() chargeData: ChargeState): Promise<boolean> {
        console.log ('==>>> received push: ' + chargeData.toString());
        return await this.chargeStateService.save (chargeData)
        .then( ( chargeData2: ChargeState ) => {
            if ( chargeData2 === undefined) {
                return false;
            } else {
                return true;
            }
        })
        .catch( ( error ) => {
            console.log ('==>>> received push (error): ' + error);
            return false;
        });
    }

    @Post('/push/drive')
    public async pushDriveState(@Body() driveState: DriveState): Promise<boolean> {
        console.log ('==>>> received push: ' + driveState.toString());
        return await this.driveStateService.save (driveState)
        .then( ( driveState2: DriveState ) => {
            if ( driveState2 === undefined) {
                return false;
            } else {
                return true;
            }
        })
        .catch( ( error ) => {
            console.log ('==>>> received push (error): ' + error);
            return false;
        });
    }
}
