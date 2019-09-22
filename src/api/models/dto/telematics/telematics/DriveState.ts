export interface DriverState {

    gpsAsOf: number;

    heading: number;

    latitude: number;

    longitude: number;

    nativeLatitude: number;

    nativeLocationSupported: number;

    nativeLongitude: number;

    nativeType: string;

    power: number;

    shiftState: string;

    speed: number;

    timestamp: number;

}
