import { User } from 'src/api/models/User';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';
import { CardOne } from '../models/dto/dashboard/CardOne';
import { CardTwo } from '../models/dto/dashboard/CardTwo';
import { ChargeEnableChartUnit } from '../models/dto/dashboard/ChargeEnableChartUnit';
import { Details } from '../models/dto/dashboard/Details';
import { DrivingPattern } from '../models/dto/dashboard/DrivingPattern';
import { OptionCodeDto } from '../models/dto/dashboard/OptionCode';
import { Stats } from '../models/dto/dashboard/Stats';
import { VehicleInformation } from '../models/dto/dashboard/VehicleInformation';
import { VehicleOptionCodes } from '../models/dto/dashboard/VehicleOptionCodes';
import { OptionCode } from '../models/OptionCode';
import { DriveState } from '../models/telematics/DriveState';
import { VehicleConfig } from '../models/telematics/VehicleConfig';
import { VehicleData } from '../models/telematics/VehicleData';
import { VehicleState } from '../models/telematics/VehicleState';
import { UserVehicle } from '../models/UserVehicle';
import { ImageRepository } from '../repositories/ImageRepository';
import { OptionCodeRepository } from '../repositories/OptionCodeRepository';
// import {
//    ChargeStateRepository
// } from '../repositories/telematicsRepositories/ChargeStateRepository';
import { DriveStateRepository } from '../repositories/telematicsRepositories/DriveStateRepository';
import {
    VehicleConfigRepository
} from '../repositories/telematicsRepositories/VehicleConfigRepository';
import {
    VehicleDataRepository
} from '../repositories/telematicsRepositories/VehicleDataRepository';
import {
    VehicleStateRepository
} from '../repositories/telematicsRepositories/VehicleStateRepository';
import { ChargeStateService } from './ChargeStateService';
import { UserService } from './UserService';
import { UserVehicleService } from './UserVehicleService';

@Service()
export class DashboardService {

    constructor(
        @OrmRepository() private vehicleDataRepository: VehicleDataRepository,
        @OrmRepository() private vehicleStateRepository: VehicleStateRepository,
        @OrmRepository() private vehicleConfigRepository: VehicleConfigRepository,
        @OrmRepository() private optionCodeRepository: OptionCodeRepository,
        @OrmRepository() private imageRepository: ImageRepository,
        // @OrmRepository() private chargeStateRepository: ChargeStateRepository,
        @OrmRepository() private driveStateRepository: DriveStateRepository,
        private chargeStateService: ChargeStateService,
        private userService: UserService,
        @Logger(__filename) private log: LoggerInterface,
        private userVehicleService: UserVehicleService
    ) {

    }
    public async getVehicleInformation( userId: string, vin: string ): Promise<VehicleInformation> {
        this.log.info('========>>>>>>> requesting for card1');
        return this.userService.findOne(userId)
        .then( async ( user: User) => {
            return await this.userVehicleService.findUserVehicle(user, vin);
        })
        .then( async ( userVehicle: UserVehicle) => {
            return await this.vehicleDataRepository.findOne({where: {
                vin: userVehicle.vin,
            }});
        })
        .then( async ( vehicleData: VehicleData) => {
            const vehicleConfig = await this.vehicleConfigRepository.findOne({ where: { vehicleData }});
            const carType = vehicleConfig.carType;
            const color = vehicleConfig.exteriorColor;
            let tag = '';
            if ( carType.includes( 'models')) {
                tag = 'tesla-model-s';
            } else if ( carType.includes( 'modelx') ) {
                tag = 'tesla-model-x';
            }
            const subTag = color.toLowerCase();
            const image = await this.imageRepository.findOne({
                where: {
                    subTag,
                    tag,
                },
            });
            const vehicleInformation: VehicleInformation = {
                nickName: vehicleData.displayName,
                keemutStartDate: vehicleData.createdAt,
                vehicleImageUrl: env.app.publicFolder + image.url,
            };
            return vehicleInformation;
        })
        .catch ( (error) => {
            this.log.error('=========>>> error card 1: ' + error);
            return undefined;
        });
    }

    public async getDetails( userId: string, vin: string ): Promise<Details> {
        return this.userService.findOne(userId)
        .then( async ( user: User) => {
            return await this.userVehicleService.findUserVehicle(user, vin);
        })
        .then( async ( userVehicle: UserVehicle) => {
            return await this.vehicleDataRepository.findOne({where: {
                vin: userVehicle.vin,
            }});
        })
        .then( async ( vehicleData: VehicleData) => {
            const carVersion = await this.vehicleStateRepository.findOne({ where: { vehicleData }}).
            then( ( vehicleState: VehicleState) => {
                const cv = vehicleState.carVersion;
                this.log.info('====>> carVersion: ' + cv );
                return cv;
             });

            const carType = await this.vehicleConfigRepository.findOne({ where: { vehicleData }}).
            then( ( vehicleConfig: VehicleConfig) => {
                const vc = vehicleConfig.carType;
                this.log.info('=======>>>> car type: ' + vc);
                return vc;
             });

            const card2: Details = {
                carVersion: String(carVersion),
                vin: vehicleData.vin,
                carType: String(carType),
            };
            return card2;
        })
        .catch ( (error) => {
            this.log.error('=========>>> error card 2: ' + error);
            return undefined;
        });
    }

    //////// todo
    public async getStats( userId: string, vin: string ): Promise<Stats> {
        let odometer = 0;
        return this.userService.findOne(userId)
        .then( async ( user: User) => {
            return await this.userVehicleService.findUserVehicle(user, vin);
        })
        .then( async ( userVehicle: UserVehicle) => {
            odometer = userVehicle.startOdometer;
            return await this.vehicleDataRepository.findOne({where: {
                vin: userVehicle.vin,
            }});
        })
        .then( async ( vehicleData: VehicleData) => {
            return await this.vehicleStateRepository.findOne({ where: { vehicleData }}).
            then( ( vehicleState: VehicleState) => {
               return vehicleState.odometer;
             });
        })
        .then( async ( odometerReading: number) => {
            let totalDriveTime = 0;
            await this.getTotalDriveTime(vin)
            .then( ( driveTime: number ) => {
                totalDriveTime = driveTime;
             });
            const card3: Stats = {
                hoursDriven: String(totalDriveTime),
                trackedDistance: String ( odometerReading - odometer ),
                odometer: String(odometerReading),
            };
            return card3;
        })
        .catch ( (error) => {
            this.log.error('=========>>> error card 3: ' + error);
            return undefined;
        });
    }

    public async getDrivingPattern( userId: string, vin: string ): Promise<DrivingPattern> {
        return undefined;
    }

    public async getCard1( userId: string, vin: string ): Promise<CardOne> {
        return this.userService.findOne(userId)
        .then( async ( user: User) => {
            return await this.userVehicleService.findUserVehicle(user, vin);
        })
        .then( async ( userVehicle: UserVehicle) => {
            return await this.vehicleDataRepository.findOne({where: {
                vin: userVehicle.vin,
            }});
        })
        .then( async ( vehicleData: VehicleData) => {
            const vehicleConfig = await this.vehicleConfigRepository.findOne({ where: { vehicleData }});

            const card1: CardOne = {
                carType: vehicleConfig.carType,
                portType: vehicleConfig.chargePortType,
                color: vehicleConfig.exteriorColor,
                trimBadging: vehicleConfig.trimBadging,
                wheelType: vehicleConfig.wheelType,
                airSuspension: vehicleConfig.hasAirSuspension,
                ludicrousMode: vehicleConfig.hasLudicrousMode,
            };
            return card1;
        })
        .catch ( (error) => {
            this.log.error('=========>>> error card 1: ' + error);
            return undefined;
        });
    }

    public async getCard2( userId: string, vin: string ): Promise<CardTwo> {
        return this.userService.findOne(userId)
        .then( async ( user: User) => {
            return await this.userVehicleService.findUserVehicle(user, vin);
        })
        .then( async ( userVehicle: UserVehicle) => {
            return await this.vehicleDataRepository.findOne({where: {
                vin: userVehicle.vin,
            }});
        })
        .then( async ( vehicleData: VehicleData) => {
            const vehicleConfig = await this.vehicleConfigRepository.findOne({ where: { vehicleData }});

            const card2: CardTwo = {
                steeringWheelHeater: false,
                spoilerType: vehicleConfig.spoilerType,
                specialType: vehicleConfig.carSpecialType,
                performanceConfig: vehicleConfig.perfConfig,
                roofColor: vehicleConfig.roofColor,
                thirdRowSeat: vehicleConfig.thirdRowSeats,
            };
            return card2;
        })
        .catch ( (error) => {
            this.log.error('=========>>> error card 1: ' + error);
            return undefined;
        });
    }

    public async getVehicleOptionCodes( userId: string, vin: string ): Promise<VehicleOptionCodes> {
        return this.userService.findOne(userId)
        .then( async ( user: User) => {
            return await this.userVehicleService.findUserVehicle(user, vin);
        })
        .then( async ( userVehicle: UserVehicle) => {
            return await this.vehicleDataRepository.findOne({where: {
                vin: userVehicle.vin,
            }});
        })
        .then( async ( vehicleData: VehicleData) => {
            const optionCodes: string[] = vehicleData.optionCodes.split(',', 10000);
            const vehicleConfig = await this.vehicleConfigRepository.findOne({ where: { vehicleData }});
            let model = vehicleConfig.carType;
            if (  vehicleConfig.carType.includes( 'models')) {
                model = 'models';
            } else if (  vehicleConfig.carType.includes( 'modelx') ) {
                model = 'modelx';
            }
            const optionCodesArray: OptionCodeDto[] = [];
            for (const optionCode of optionCodes) {
                await this.optionCodeRepository.findOne(
                    {
                        where: {
                            optionCode,
                            vehicleModel: model,
                        },
                    }
                )
                .then( ( optionCodeResult: OptionCode) => {
                    let optionCodeFullx = '';
                    if (  optionCodeResult !== undefined ) {
                        optionCodeFullx = optionCodeResult.optionCodeFull;
                    }

                    const optCd: OptionCodeDto = {
                        optionCode,
                        optionCodeFull: optionCodeFullx,
                    };
                    optionCodesArray.push(optCd);
                });
            }
            const vehicleOptionSpecs: VehicleOptionCodes = {
                optionCodes: optionCodesArray,
            };
            return vehicleOptionSpecs;
        })
        .catch ( (error) => {
            this.log.error('=========>>> error card option codes: ' + error);
            return undefined;
        });
    }

    public async getChargeEnableChart(vin: string): Promise<ChargeEnableChartUnit[]>{
        return this.chargeStateService.getChargeEnableChart(vin);
     }

    private async getTotalDriveTime( vinId: string): Promise <number> {
        let sum = 0;
        return this.driveStateRepository.createQueryBuilder('drive_state')
        .where('drive_state.vin = :vin', { vin: vinId})
      //  .andWhere('drive_state.shift_state = :shift_state', { shift_state: 'D'})
        .orderBy('timestamp')
        .getMany()
        .then( ( driveStates: DriveState[]) => {
            for ( let i = 0; i < driveStates.length; i++ ) {
                if ( i > 1) {
                    const first = driveStates[i - 1].timestamp;
                    const last = driveStates[i].timestamp;
                    const total =  (new Date(first)).valueOf() -  (new Date(last)).valueOf();
                    this.log.info('=========>>> calculation: ' + first + ', last: ' + last + ', total: ' + total);
                    sum = sum + total;
                }
            }
            this.log.info('Sum ===>>> ' + sum);
            return sum;
        })
        .catch( (error) => {
            this.log.error('=========>>> error getTotalDriveTime: ' + error);
            return undefined;
        });
    }
    // private async getTotalDriveDistance( vinId: string): Promise <number> {
    //     this.driveStateRepository.createQueryBuilder('drive_state')
    //     .where('drive_state.vin = :vin', { vin: vinId})
    //     .orderBy('timestamp')
    //     .getMany()
    //     .then( ( driveStates: DriveState[]) => {
    //         for ( const driveState of driveStates) {
    //             this.log.info('==> DriveStates: ' + driveState.timestamp);
    //         }
    //     })
    //     .catch( (error) => {
    //         this.log.error('=========>>> error finding all the Drive State: ' + error);
    //         return undefined;
    //     });
    //     return undefined;
    // }
    // private async getBatteryStatus( vinId: string): Promise <number> {
    //     this.driveStateRepository.createQueryBuilder('drive_state')
    //     .where('drive_state.vin = :vin', { vin: vinId})
    //     .orderBy('timestamp')
    //     .getMany()
    //     .then( ( driveStates: DriveState[]) => {
    //         for ( const driveState of driveStates) {
    //             this.log.info('==> DriveStates: ' + driveState.timestamp);
    //         }
    //     })
    //     .catch( (error) => {
    //         this.log.error('=========>>> error finding all the Drive State: ' + error);
    //         return undefined;
    //     });
    //     return undefined;
    // }

}
