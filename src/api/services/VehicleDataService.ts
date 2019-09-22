import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import uuid from 'uuid';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ChargeState } from '../models/telematics/ChargeState';
import { ClimateState } from '../models/telematics/ClimateState';
import { DriveState } from '../models/telematics/DriveState';
import { GuiSettings } from '../models/telematics/GuiSettings';
import { MediaState } from '../models/telematics/MediaState';
import { SoftwareUpdate } from '../models/telematics/SoftwareUpdate';
import { SpeedLimitMode } from '../models/telematics/SpeedLimitMode';
import { VehicleConfig } from '../models/telematics/VehicleConfig';
import { VehicleData } from '../models/telematics/VehicleData';
import { VehicleState } from '../models/telematics/VehicleState';
import {
    ChargeStateRepository
} from '../repositories/telematicsRepositories/ChargeStateRepository';
import {
    ClimateStateRepository
} from '../repositories/telematicsRepositories/ClimateStateRepository';
import { DriveStateRepository } from '../repositories/telematicsRepositories/DriveStateRepository';
import {
    GuiSettingsRepository
} from '../repositories/telematicsRepositories/GuiSettingsRepository';
import { MediaStateRepository } from '../repositories/telematicsRepositories/MediaStateRepository';
import {
    SoftwareUpdateRepository
} from '../repositories/telematicsRepositories/SoftwareUpdateRepository';
import {
    SpeedLimitModeRepository
} from '../repositories/telematicsRepositories/SpeedLimitModeRepository';
import {
    VehicleConfigRepository
} from '../repositories/telematicsRepositories/VehicleConfigRepository';
import {
    VehicleDataRepository
} from '../repositories/telematicsRepositories/VehicleDataRepository';
import {
    VehicleStateRepository
} from '../repositories/telematicsRepositories/VehicleStateRepository';

@Service()
export class VehicleDataService {

    constructor(
        @OrmRepository() private vehicleDataRepository: VehicleDataRepository,
        @OrmRepository() private vehicleConfigRepository: VehicleConfigRepository,
        @OrmRepository() private driveStateRepository: DriveStateRepository,
        @OrmRepository() private chargeStateRepository: ChargeStateRepository,
        @OrmRepository() private climateStateRepository: ClimateStateRepository,
        @OrmRepository() private guiSettingsRepository: GuiSettingsRepository,
        @OrmRepository() private mediaStateRepository: MediaStateRepository,
        @OrmRepository() private softwareUpdateRepository: SoftwareUpdateRepository,
        @OrmRepository() private speedLimitModeRepository: SpeedLimitModeRepository,
        @OrmRepository() private vehicleStateRepository: VehicleStateRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {

    }
    public async create(vehicleData: VehicleData): Promise<VehicleData> {
        vehicleData.id = uuid.v4();
        return await this.vehicleDataRepository.save ( vehicleData );
    }

    public async save(vehicleData: VehicleData): Promise <VehicleData> {

        const newVehicle = new VehicleData();
        newVehicle.id = uuid.v4();
        newVehicle.userId = vehicleData.userId;
        newVehicle.vehicleId = vehicleData.vehicleId;
        newVehicle.vin = vehicleData.vin;
        newVehicle.displayName = vehicleData.displayName;
        newVehicle.optionCodes = vehicleData.optionCodes;
        newVehicle.color = vehicleData.color;
        newVehicle.state = vehicleData.state;
        newVehicle.inService = vehicleData.inService;
        newVehicle.idS = vehicleData.idS;
        newVehicle.calendarEnabled = vehicleData.calendarEnabled;
        newVehicle.apiVersion = vehicleData.apiVersion;
        newVehicle.backseatToken = vehicleData.backseatToken;
        newVehicle.backseatTokenUpdatedAt = vehicleData.backseatTokenUpdatedAt;

        return this.vehicleDataRepository.save(newVehicle)
        .then( async ( vehicleDataReturned: VehicleData ) => {
            const vehicleConfig = new VehicleConfig();
            vehicleConfig.canAcceptNavigationRequests = vehicleData.vehicleConfig.canAcceptNavigationRequests;
            vehicleConfig.canActuateTrunks = vehicleData.vehicleConfig.canActuateTrunks;
            vehicleConfig.carSpecialType = vehicleData.vehicleConfig.carSpecialType;
            vehicleConfig.carType = vehicleData.vehicleConfig.carType;
            vehicleConfig.chargePortType = vehicleData.vehicleConfig.chargePortType;
            vehicleConfig.euVehicle = vehicleData.vehicleConfig.euVehicle;
            vehicleConfig.exteriorColor = vehicleData.vehicleConfig.exteriorColor;
            vehicleConfig.hasAirSuspension = vehicleData.vehicleConfig.hasAirSuspension;
            vehicleConfig.hasLudicrousMode = vehicleData.vehicleConfig.hasLudicrousMode;
            vehicleConfig.motorizedChargePort = vehicleData.vehicleConfig.motorizedChargePort;
            vehicleConfig.perfConfig = vehicleData.vehicleConfig.perfConfig;
            vehicleConfig.plg = vehicleData.vehicleConfig.plg;
            vehicleConfig.rearSeatHeaters = vehicleData.vehicleConfig.rearSeatHeaters;
            vehicleConfig.rearSeatType = vehicleData.vehicleConfig.rearSeatType;
            vehicleConfig.rhd = vehicleData.vehicleConfig.rhd;
            vehicleConfig.roofColor = vehicleData.vehicleConfig.roofColor;
            vehicleConfig.seatType = vehicleData.vehicleConfig.seatType;
            vehicleConfig.spoilerType = vehicleData.vehicleConfig.spoilerType;
            vehicleConfig.sunRoofInstalled = vehicleData.vehicleConfig.sunRoofInstalled;
            vehicleConfig.thirdRowSeats = vehicleData.vehicleConfig.thirdRowSeats;
            // vehicleConfig.timestamp = vehicleData.vehicleConfig.timestamp;
            vehicleConfig.trimBadging = vehicleData.vehicleConfig.trimBadging;
            vehicleConfig.wheelType = vehicleData.vehicleConfig.wheelType;
            vehicleConfig.vehicleData = vehicleDataReturned;
            vehicleConfig.id = uuid.v4();

            const newDriveState = new DriveState();
            newDriveState.vin = vehicleDataReturned.vin;
            newDriveState.vehicleData = vehicleDataReturned;
            newDriveState.gpsAsOf = vehicleData.driveState.gpsAsOf;
            newDriveState.heading = vehicleData.driveState.heading;
            newDriveState.latitude = vehicleData.driveState.latitude;
            newDriveState.longitude = vehicleData.driveState.longitude;
            newDriveState.nativeLatitude = vehicleData.driveState.nativeLatitude;
            newDriveState.nativeLocationSupported = vehicleData.driveState.nativeLocationSupported;
            newDriveState.nativeLongitude = vehicleData.driveState.nativeLongitude;
            newDriveState.nativeType = vehicleData.driveState.nativeType;
            newDriveState.power = vehicleData.driveState.power;
            newDriveState.shiftState = vehicleData.driveState.shiftState;
            newDriveState.speed = vehicleData.driveState.speed;
            newDriveState.id = uuid.v4();
            newDriveState.timestamp = vehicleData.driveState.timestamp;

            const climateState = new ClimateState();
            climateState.vehicleData = vehicleDataReturned;
            climateState.batteryHeater = vehicleData.climateState.batteryHeater;
            climateState.batteryHeaterNoPower = vehicleData.climateState.batteryHeaterNoPower;
            climateState.driverTempSetting = vehicleData.climateState.driverTempSetting;
            climateState.fanStatus = vehicleData.climateState.fanStatus;
            climateState.insideTemp = vehicleData.climateState.insideTemp;
            climateState.isAutoConditioningOn = vehicleData.climateState.isAutoConditioningOn;
            climateState.isClimateOn = vehicleData.climateState.isClimateOn;
            climateState.isFrontDefrosterOn = vehicleData.climateState.isFrontDefrosterOn;
            climateState.isPreconditioning = vehicleData.climateState.isPreconditioning;
            climateState.isRearDefrosterOn = vehicleData.climateState.isRearDefrosterOn;
            climateState.leftTempDirection = vehicleData.climateState.leftTempDirection;
            climateState.maxAvailTemp = vehicleData.climateState.maxAvailTemp;
            climateState.minAvailTemp = vehicleData.climateState.minAvailTemp;
            climateState.outsideTemp = vehicleData.climateState.outsideTemp;
            climateState.passengerTempSetting = vehicleData.climateState.passengerTempSetting;
            climateState.remoteHeaterControlEnabled = vehicleData.climateState.remoteHeaterControlEnabled;
            climateState.rightTempDirection = vehicleData.climateState.rightTempDirection;
            climateState.seatHeaterLeft = vehicleData.climateState.seatHeaterLeft;
            climateState.seatHeaterRearCenter = vehicleData.climateState.seatHeaterRearCenter;
            climateState.seatHeaterRearLeft = vehicleData.climateState.seatHeaterRearLeft;
            climateState.seatHeaterRearRight = vehicleData.climateState.seatHeaterRearRight;
            climateState.seatHeaterRight = vehicleData.climateState.seatHeaterRight;
            climateState.seatHeaterThirdRowLeft = vehicleData.climateState.seatHeaterThirdRowLeft;
            climateState.seatHeaterThirdRowRight = vehicleData.climateState.seatHeaterThirdRowRight;
            climateState.sideMirrorHeaters = vehicleData.climateState.sideMirrorHeaters;
            climateState.smartPreconditioning = vehicleData.climateState.smartPreconditioning;
            climateState.steeringWheelHeater = vehicleData.climateState.steeringWheelHeater;
            // climateState.timestamp = vehicleData.climateState.timestamp;
            climateState.wiperBladeHeater = vehicleData.climateState.wiperBladeHeater;
            climateState.id = uuid.v4();

            const newChargeState = new ChargeState();
            newChargeState.vin = vehicleDataReturned.vin;
            newChargeState.vehicleData = vehicleDataReturned;
            newChargeState.batteryHeaterOn = vehicleData.chargeState.batteryHeaterOn;
            newChargeState.batteryLevel = vehicleData.chargeState.batteryLevel;
            newChargeState.batteryRange = vehicleData.chargeState.batteryRange;
            newChargeState.chargeCurrentRequest = vehicleData.chargeState.chargeCurrentRequest;
            newChargeState.chargeCurrentRequestMax = vehicleData.chargeState.chargeCurrentRequestMax;
            newChargeState.chargeEnableRequest = vehicleData.chargeState.chargeEnableRequest;
            newChargeState.chargeEnergyAdded = vehicleData.chargeState.chargeEnergyAdded;
            newChargeState.chargeLimitSoc = vehicleData.chargeState.chargeLimitSoc;
            newChargeState.chargeLimitSocMax = vehicleData.chargeState.chargeLimitSocMax;
            newChargeState.chargeLimitSocMin = vehicleData.chargeState.chargeLimitSocMin;
            newChargeState.chargeLimitSocStd = vehicleData.chargeState.chargeLimitSocStd;
            newChargeState.chargeMilesAddedIdeal = vehicleData.chargeState.chargeMilesAddedIdeal;
            newChargeState.chargeMilesAddedRated = vehicleData.chargeState.chargeMilesAddedRated;
            newChargeState.chargePortColdWeatherMode = vehicleData.chargeState.chargePortColdWeatherMode;
            newChargeState.chargePortDoorOpen = vehicleData.chargeState.chargePortDoorOpen;
            newChargeState.chargePortLatch = vehicleData.chargeState.chargePortLatch;
            newChargeState.chargeRate = vehicleData.chargeState.chargeRate;
            newChargeState.chargeToMaxRange = vehicleData.chargeState.chargeToMaxRange;
            newChargeState.chargerActualCurrent = vehicleData.chargeState.chargerActualCurrent;
            newChargeState.chargerPhases = vehicleData.chargeState.chargerPhases;
            newChargeState.chargerPilotCurrent = vehicleData.chargeState.chargerPilotCurrent;
            newChargeState.chargerPower = vehicleData.chargeState.chargerPower;
            newChargeState.chargerVoltage = vehicleData.chargeState.chargerVoltage;
            newChargeState.chargingState = vehicleData.chargeState.chargingState;
            newChargeState.connChargeCable = vehicleData.chargeState.connChargeCable;
            newChargeState.estBatteryRange = vehicleData.chargeState.estBatteryRange;
            newChargeState.fastChargerBrand = vehicleData.chargeState.fastChargerBrand;
            newChargeState.fastChargerPresent = vehicleData.chargeState.fastChargerPresent;
            newChargeState.fastChargerType = vehicleData.chargeState.fastChargerType;
            newChargeState.idealBatteryRange = vehicleData.chargeState.idealBatteryRange;
            newChargeState.managedChargingActive = vehicleData.chargeState.managedChargingActive;
            newChargeState.managedChargingStartTime = vehicleData.chargeState.managedChargingStartTime;
            newChargeState.managedChargingUserCanceled = vehicleData.chargeState.managedChargingUserCanceled;
            newChargeState.maxRangeChargeCounter = vehicleData.chargeState.maxRangeChargeCounter;
            newChargeState.notEnoughPowerToHeat = vehicleData.chargeState.notEnoughPowerToHeat;
            newChargeState.scheduledChargingPending = vehicleData.chargeState.scheduledChargingPending;
            newChargeState.scheduledChargingStartTime = vehicleData.chargeState.scheduledChargingStartTime;
            newChargeState.timeToFullCharge = vehicleData.chargeState.timeToFullCharge;
            newChargeState.timestamp = vehicleData.chargeState.timestamp;
            newChargeState.tripCharging = vehicleData.chargeState.tripCharging;
            newChargeState.usableBatteryLevel = vehicleData.chargeState.usableBatteryLevel;
            newChargeState.userChargeEnableRequest = vehicleData.chargeState.userChargeEnableRequest;
            newChargeState.id = uuid.v4();

            const newGuiSettings = new GuiSettings();
            newGuiSettings.vehicleData = vehicleDataReturned;
            newGuiSettings.gui24HourTime = vehicleData.guiSettings.gui24HourTime;
            newGuiSettings.guiChargeRateUnits = vehicleData.guiSettings.guiChargeRateUnits;
            newGuiSettings.guiDistanceUnits = vehicleData.guiSettings.guiDistanceUnits;
            newGuiSettings.guiRangeDisplay = vehicleData.guiSettings.guiRangeDisplay;
            newGuiSettings.guiTemperatureUnits = vehicleData.guiSettings.guiTemperatureUnits;
            newGuiSettings.id = uuid.v4();

            const newVehicleState = new VehicleState();
            newVehicleState.vehicleData = vehicleDataReturned;
            newVehicleState.apiVersion = vehicleData.vehicleState.apiVersion;
            newVehicleState.autoparkStateV2 = vehicleData.vehicleState.autoparkStateV2;
            newVehicleState.autoparkStyle = vehicleData.vehicleState.autoparkStyle;
            newVehicleState.calendarSupported = vehicleData.vehicleState.calendarSupported;
            newVehicleState.carVersion = vehicleData.vehicleState.carVersion;
            newVehicleState.centerDisplayState = vehicleData.vehicleState.centerDisplayState;
            newVehicleState.df = vehicleData.vehicleState.df;
            newVehicleState.dr = vehicleData.vehicleState.dr;
            newVehicleState.ft = vehicleData.vehicleState.ft;
            newVehicleState.homelinkNearby = vehicleData.vehicleState.homelinkNearby;
            newVehicleState.isUserPresent = vehicleData.vehicleState.isUserPresent;
            newVehicleState.lastAutoparkError = vehicleData.vehicleState.lastAutoparkError;
            newVehicleState.locked = vehicleData.vehicleState.locked;
            newVehicleState.notificationsSupported = vehicleData.vehicleState.notificationsSupported;
            newVehicleState.odometer = vehicleData.vehicleState.odometer;
            newVehicleState.parsedCalendarSupported = vehicleData.vehicleState.parsedCalendarSupported;
            newVehicleState.pf = vehicleData.vehicleState.pf;
            newVehicleState.pr = vehicleData.vehicleState.pr;
            newVehicleState.remoteStart = vehicleData.vehicleState.remoteStart;
            newVehicleState.remoteStartEnabled = vehicleData.vehicleState.remoteStartEnabled;
            newVehicleState.remoteStartSupported = vehicleData.vehicleState.remoteStartSupported;
            newVehicleState.rt = vehicleData.vehicleState.rt;
            newVehicleState.sentryMode = vehicleData.vehicleState.sentryMode;
            newVehicleState.sunRoofPercentOpen = vehicleData.vehicleState.sunRoofPercentOpen;
            newVehicleState.sunRoofState = vehicleData.vehicleState.sunRoofState;
            // newVehicleState.timestamp = vehicleData.vehicleState.timestamp;
            newVehicleState.valetMode = vehicleData.vehicleState.valetMode;
            newVehicleState.valetPinNeeded = vehicleData.vehicleState.valetPinNeeded;
            newVehicleState.vehicleName = vehicleData.vehicleState.vehicleName;
            newVehicleState.id = uuid.v4();

            const newVehicleConfig2 = await this.vehicleConfigRepository.save(vehicleConfig)
            .then( ( vehicleConfigReturned: VehicleConfig) => {
                this.log.info('============= return from vehicle config: ' + vehicleConfigReturned.id);
                return vehicleConfigReturned;
            })
            .catch( ( error ) => {
                this.log.error('============= error while saving vehicleConfig:' + error);
                return undefined;
            });

            const newDriveState2 = await this.driveStateRepository.save(newDriveState)
            .then( ( vehicleConfigReturned: DriveState) => {
                this.log.info('============= return from DriveState: ' + vehicleConfigReturned.id);
                return vehicleConfigReturned;
            })
            .catch( ( error ) => {
                this.log.error('============= error while saving DriveState:' + error);
                return undefined;
            });

            const newChargeState2 = await this.chargeStateRepository.save(newChargeState)
            .then( ( vehicleConfigReturned: ChargeState) => {
                this.log.info('============= return from ChargeState: ' + vehicleConfigReturned.id);
                return vehicleConfigReturned;
            })
            .catch( ( error ) => {
                this.log.error('============= error while saving ChargeState:' + error);
                return undefined;
            });

            const newClimateState2 = await this.climateStateRepository.save(climateState)
            .then( ( vehicleConfigReturned: ClimateState) => {
                this.log.info('============= return from ClimateState : ' + vehicleConfigReturned.id);
                return vehicleConfigReturned;
            })
            .catch( ( error ) => {
                this.log.error('============= error while saving ClimateState:' + error);
                return undefined;
            });

            const newGuiSettings2 = await this.guiSettingsRepository.save(newGuiSettings)
            .then( ( vehicleConfigReturned: GuiSettings) => {
                this.log.info('============= return from GuiSettings : ' + vehicleConfigReturned.id);
                return vehicleConfigReturned;
            })
            .catch( ( error ) => {
                this.log.error('============= error while saving GuiSettings:' + error);
                return undefined;
            });

            const newVehicleState2 = await this.vehicleStateRepository.save(newVehicleState)
            .then( ( vehicleConfigReturned: VehicleState) => {
                this.log.info('============= return from VehicleState: ' + vehicleConfigReturned.id);
                return vehicleConfigReturned;
            })
            .catch( ( error ) => {
                this.log.error('============= error while saving VehicleState:' + error);
                return undefined;
            });

            const newMediaState = new MediaState();
            newMediaState.remoteControlEnabled = vehicleData.vehicleState.mediaState.remoteControlEnabled;
            newMediaState.vehicleState = newVehicleState2;
            newMediaState.id = uuid.v4();

            const newSoftwareUpdate = new SoftwareUpdate();
            newSoftwareUpdate.expectedDurationSec =  vehicleData.vehicleState.softwareUpdate.expectedDurationSec;
            newSoftwareUpdate.status =  vehicleData.vehicleState.softwareUpdate.status;
            newSoftwareUpdate.vehicleState = newVehicleState2;
            newSoftwareUpdate.id = uuid.v4();

            const newSpeedLimitMode = new SpeedLimitMode();
            newSpeedLimitMode.active =  vehicleData.vehicleState.speedLimitMode.active;
            newSpeedLimitMode.currentLimitMph = vehicleData.vehicleState.speedLimitMode.currentLimitMph;
            newSpeedLimitMode.maxLimitMph = vehicleData.vehicleState.speedLimitMode.maxLimitMph;
            newSpeedLimitMode.minLimitMph = vehicleData.vehicleState.speedLimitMode.minLimitMph;
            newSpeedLimitMode.pinCodeSet = vehicleData.vehicleState.speedLimitMode.pinCodeSet;
            newSpeedLimitMode.vehicleState = newVehicleState2;
            newSpeedLimitMode.id = uuid.v4();

            const newMediaState2 = await this.mediaStateRepository.save(newMediaState);
            const newSoftwareUpdate2 = await this.softwareUpdateRepository.save(newSoftwareUpdate);
            const newSpeedLimitMode2 = await this.speedLimitModeRepository.save(newSpeedLimitMode);

            newVehicleState2.mediaState = newMediaState2;
            newVehicleState2.softwareUpdate = newSoftwareUpdate2;
            newVehicleState2.speedLimitMode = newSpeedLimitMode2;

            // await this.vehicleStateRepository.save(newVehicleState2);

            vehicleData.vehicleConfig = newVehicleConfig2;
            vehicleData.driveState = newDriveState2;
            vehicleData.chargeState = newChargeState2;
            vehicleData.guiSettings = newGuiSettings2;
            vehicleData.vehicleState = newVehicleState2;
            vehicleData.climateState = newClimateState2;
            this.log.info ('===================>>>>>>>>>>>>>>>>>>>>............' + vehicleData.vin);
            // await this.vehicleDataRepository.save(vehicleData);
            return vehicleData;
        })
        .catch( ( error ) => {
            this.log.error('======>>>>>> error: ' + error );
            return undefined;
        });
    }

    public async findOne( userId: string, vehicleId: string): Promise <VehicleData> {
        return this.vehicleDataRepository.findOne({
            where: {
                userId,
                vehicleId,
            },
        });
    }

    public async findOneWithVin( userId: string, vin: string): Promise <VehicleData> {
        return this.vehicleDataRepository.findOne({
            where: {
                userId,
                vin,
            },
        });
    }
}
