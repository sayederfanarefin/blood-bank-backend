export interface ChargeState {

    batteryHeaterOn: boolean;

    batteryLevel: number;

    batteryRange: number;

    chargeCurrentRequest: number;

    chargeCurrentRequestMax: number;

    chargeEnableRequest: boolean;

    chargeEnergyAdded: number;

    chargeLimitSoc: number;

    chargeLimitSocMax: number;

    chargeLimitSocMin: number;

    chargeLimitSocStd: number;

    chargeMilesAddedIdeal: number;

    chargeMilesAddedRated: number;

    chargePortColdWeatherMode: string;

    chargePortDoorOpen: boolean;

    chargePortLatch: string;

    chargeRate: number;

    chargeToMaxRange: boolean;

    chargerActualCurrent: number;

    chargerPhases: string;

    chargerPilotCurrent: number;

    chargerPower: number;

    chargerVoltage: number;

    chargingState: string;

    connChargeCable: string;

    estBatteryRange: number;

    fastChargerBrand: string;

    fastChargerPresent: boolean;

    fastChargerType: string;

    idealBatteryRange: number;

    managedChargingActive: boolean;

    managedChargingStartTime: string;

    managedChargingUserCanceled: boolean;

    maxRangeChargeCounter: number;

    notEnoughPowerToHeat: boolean;

    scheduledChargingPending: boolean;

    scheduledChargingStartTime: string;

    timeToFullCharge: number;

    timestamp: number;

    tripCharging: boolean;

    usableBatteryLevel: number;

    userChargeEnableRequest: boolean;
}
