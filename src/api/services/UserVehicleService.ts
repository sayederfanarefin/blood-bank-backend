import { Service } from 'typedi';
// import { UpdateResult } from 'typeorm';
import { OrmRepository } from 'typeorm-typedi-extensions';

// import uuid from 'uuid';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { VehicleInput } from '../models/dto/asif/VehicleInputDTO';
import { VehicleData } from '../models/telematics/VehicleData';
import { User } from '../models/User';
import { UserVehicle } from '../models/UserVehicle';
import { Vehicle } from '../models/Vehicle';
import { UserVehicleRepository } from '../repositories/UserVehicleRepository';
import { SchedularModuleService } from './SchedularModuleService';
import { UserService } from './UserService';
import { VehicleDataService } from './VehicleDataService';
import { VehicleService } from './VehicleService';
import { VINDecoderService } from './VINDecoderService';

import uuid = require('uuid');
@Service()
export class UserVehicleService {

    constructor(
        @OrmRepository() private userVehicleRepository: UserVehicleRepository,
        @Logger(__filename) private log: LoggerInterface,
        private userService: UserService,
        private vehicleService: VehicleService,
        private vINDecoderService: VINDecoderService,
        private schedularModuleService: SchedularModuleService,
        private vehicleDataService: VehicleDataService
    ) {

    }
    public find( user: User ): Promise<UserVehicle[]> {
        this.log.info('Find all UserVehicle');
        return this.userVehicleRepository.find({
            where: {
                user,
             }});
    }

    public findUserVehicle( user: User, vin: string ): Promise<UserVehicle> {
        this.log.info('Find all UserVehicle');
        return this.userVehicleRepository.findOne({
            where: {
                user,
                vin,
             }});
    }

    public findOne(id: string): Promise<UserVehicle | undefined> {
        this.log.info('Find one UserVehicle');
        return this.userVehicleRepository.findOne({ id });
    }

    public async create( userId: string, vehicleInput: VehicleInput ): Promise< boolean > {
        return await this.schedularModuleService.schedule ( userId, vehicleInput.vehicleEmail, vehicleInput.vehiclePassword, vehicleInput.vin )
        .then ( async ( resultsFromScheduler: VehicleData) => {
               console.log(resultsFromScheduler);
            if ( resultsFromScheduler !== undefined ) {
               // save this data
                await this.vehicleDataService.save(resultsFromScheduler);
                return resultsFromScheduler;
            } else {
                return undefined;
            }
        })
        .then ( async (resultsFromScheduler: VehicleData) => {
            if ( resultsFromScheduler !== undefined ) {
                const makeModelYear = await this.vINDecoderService.getMakeModelYear( vehicleInput.vin );
                return { makeModelYear, resultsFromScheduler };
            } else {
                return undefined;
            }
        })
        .then ( async ( previousResult: any ) => {
            const makeModelYear = previousResult.makeModelYear;
            const resultsFromScheduler = previousResult.resultsFromScheduler;
            const reply = await this.vehicleService.findWithNameYearModel( makeModelYear.make, makeModelYear.modelYear, makeModelYear.model);
            return { vehicle: reply, serial: makeModelYear.serial, resultsFromScheduler };
        })
        .then ( async ( replyFromPrevious: any ) => {
            const vehicle: Vehicle = replyFromPrevious.vehicle;
            const resultsFromScheduler: VehicleData = replyFromPrevious.resultsFromScheduler;

            const userVehicle = new UserVehicle();
            userVehicle.vehicle = vehicle;
            userVehicle.startOdometer = resultsFromScheduler.vehicleState.odometer; // vehicleInput.startOdometer;
            userVehicle.teslaUsername = vehicleInput.vehicleEmail;
            userVehicle.teslaPassword = vehicleInput.vehiclePassword;
            userVehicle.vin = vehicleInput.vin;
            userVehicle.plateNumber = replyFromPrevious.serial;
            userVehicle.timeZone = vehicleInput.zoneId;
            userVehicle.name = resultsFromScheduler.displayName;
            userVehicle.vehicleStartDate = String (new Date());
            // userVehicle.carType = resultsFromScheduler.vehicleConfig.carType;
            // userVehicle.chargePortType = resultsFromScheduler.vehicleConfig.chargePortType;
            // userVehicle.exteriorColour = resultsFromScheduler.vehicleConfig.exteriorColor;
            // userVehicle.hasAirSuspension = resultsFromScheduler.vehicleConfig.hasAirSuspension;
            // userVehicle.wheelType = resultsFromScheduler.vehicleConfig.wheelType;
            // userVehicle.spoilerType = resultsFromScheduler.vehicleConfig.spoilerType;
            // userVehicle.hasLudicrousMode = resultsFromScheduler.vehicleConfig.hasLudicrousMode;
            // userVehicle.roofColor = resultsFromScheduler.vehicleConfig.roofColor;
            // userVehicle.thirdRowSeats = resultsFromScheduler.vehicleConfig.thirdRowSeats;
            // userVehicle.trimBadging = resultsFromScheduler.vehicleConfig.trimBadging;
            // userVehicle.perfConfig = resultsFromScheduler.vehicleConfig.perfConfig;
            // userVehicle.speedUnit = resultsFromScheduler.guiSettings.guiDistanceUnits;
            return { userVehicle, vehicle };
        })
        .then ( async ( userVehicleVehicle: any ) => {
            const userVehicle: UserVehicle = userVehicleVehicle.userVehicle;

            const user = await this.userService.findOne( userId );
            userVehicle.user = user;
            return userVehicle;
        })
        .then ( async ( userVehicle: UserVehicle ) => {
            userVehicle.id = uuid.v4();
            return await this.userVehicleRepository.save( userVehicle );
        })
        .then ( ( userVehicle: UserVehicle ) => {
            if ( userVehicle !== undefined) {
                return true;
            } else {
                return false;
            }
        })
        .catch( ( error ) => {
            console.log ( ' ====>>>> error ' + error);
            return false;
        });
    }

    public async update( userId: string, vehicleInput: VehicleInput, id: string ): Promise< boolean > {
        return false;
        // return await this.schedularModuleService.schedule ( userId, vehicleInput.vehicleEmail, vehicleInput.vehiclePassword, vehicleInput.vin )
        // .then ( async ( results: boolean) => {
        //     if ( results ) {
        //         return this.vINDecoderService.getMakeModelYear( vehicleInput.vin );
        //     } else {
        //         return undefined;
        //     }
        // })
        // .then ( async ( makeModelYear: any ) => {
        //     return await this.vehicleService.findWithNameYearModel( makeModelYear.make, makeModelYear.modelYear, makeModelYear.model);
        // })
        // .then ( async ( vehicle: Vehicle ) => {
        //     const currentUserVehicle = await this.userVehicleRepository.findOne({where: { id }});
        //    // const currentUserVehicle = new UserVehicle();
        //     currentUserVehicle.vehicle = vehicle;
        //     currentUserVehicle.startOdometer = 0; // vehicleInput.startOdometer;
        //     currentUserVehicle.teslaUsername = vehicleInput.vehicleEmail;
        //     currentUserVehicle.teslaPassword = vehicleInput.vehiclePassword;
        //     currentUserVehicle.vin = vehicleInput.vin;
        //     currentUserVehicle.timeZone = vehicleInput.zoneId;
        //     return { currentUserVehicle, vehicle };
        // })
        // .then ( async ( userVehicleVehicle: any ) => {
        //     const userVehicle = userVehicleVehicle.userVehicle;

        //     const user = await this.userService.findOne( userId );
        //     userVehicle.user = user;
        //     return userVehicle;
        // })
        // .then ( async ( userVehicle: UserVehicle ) => {
        //     return await this.userVehicleRepository.update( id, userVehicle );
        // })

        // .then ( ( updateResult: UpdateResult ) => {
        //     if ( updateResult.generatedMaps.length !== 0 ) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // })
        // .catch( ( error ) => {
        //     console.log ( ' ====>>>> error ' + error);
        //     return false;
        // });
    }

    public async delete(id: string): Promise< void > {
         await this.userVehicleRepository.delete(id);
    }

    // private async createAccountSchedularModule(userId: string, teslaUserName: string, teslaPassword: string, vin: string): Promise<any> {
    //     const config: AxiosRequestConfig = {
    //         url: env.schedulerModule.createUserEndpoint,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         baseURL: env.schedulerModule.baseUrl,
    //         data: {
    //             xyz: userId,
    //             username: teslaUserName,
    //             password: teslaPassword,
    //             vin,
    //         },
    //     };

    //     const handleResponse = async (response: AxiosResponse) => {
    //         return response;
    //         // if (response.status !== 200) {
    //         //     return false;
    //         // } else {
    //         //     return true;
    //         // }
    //     };
    //     const handleError = (error: AxiosError) => {
    //         return false;
    //     };
    //     return await axios(config)
    //         .then(handleResponse)
    //         .catch(handleError);
    // }
}
