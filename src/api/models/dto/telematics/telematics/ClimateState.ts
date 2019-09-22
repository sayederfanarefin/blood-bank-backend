export interface ClimateState {

    batteryHeater: boolean;

    batteryHeaterNoPower: boolean;

    driverTempSetting: number;

    fanStatus: number;

    insideTemp: number;

    isAutoConditioningOn: boolean;

    isClimateOn: boolean;

    isFrontDefrosterOn: boolean;

    isPreconditioning: boolean;

    isRearDefrosterOn: boolean;

    leftTempDirection: number;

    maxAvailTemp: number;

    minAvailTemp: number;

    outsideTemp: number;

    passengerTempSetting: number;

    remoteHeaterControlEnabled: boolean;

    rightTempDirection: number;

    seatHeaterLeft: number;

    seatHeaterRearCenter: number;

    seatHeaterRearLeft: number;

    seatHeaterRearRight: number;

    seatHeaterRight: number;

    seatHeaterThirdRowLeft: number;

    seatHeaterThirdRowRight: number;

    sideMirrorHeaters: boolean;

    smartPreconditioning: boolean;

    steeringWheelHeater: boolean;

    timestamp: number;

    wiperBladeHeater: boolean;

}
