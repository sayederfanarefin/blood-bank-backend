import { MediaState } from './MediaState';
import { SoftwareUpdate } from './SoftwareUpdate';
import { SpeedLimitMode } from './SpeedLimitMode';

export interface VehicleState {

    apiVersion: number;

    autoparkStateV2: string;

    autoparkStyle: string;

    calendarSupported: boolean;

    carVersion: number;

    centerDisplayState: number;

    df: number;

    dr: number;

    ft: number;

    homelinkNearby: boolean;

    isUserPresent: boolean;

    lastAutoparkError: string;

    locked: boolean;

    notificationsSupported: boolean;

    odometer: number;

    parsedCalendarSupported: boolean;

    pf: number;

    pr: number;

    remoteStart: boolean;

    remoteStartEnabled: boolean;

    remoteStartSupported: boolean;

    rt: number;

    sentryMode: boolean;

    softwareUpdate: SoftwareUpdate;

    speedLimitMode: SpeedLimitMode;

    mediaState: MediaState;

    sunRoofPercentOpen: number;

    sunRoofState: string;

    timestamp: number;

    valetMode: boolean;

    valetPinNeeded: boolean;

    vehicleName: string;

}
