import { ChargeState } from './ChargeState';
import { ClimateState } from './ClimateState';
import { DriverState } from './DriveState';
import { GuiSettings } from './GuiSettings';
// import { Token } from './Token';
import { VehicleConfig } from './VehicleConfig';
import { VehicleState } from './VehicleState';

export interface VehicleDataReply {

    userId: string;

    vehicleId: number;

    vin: string;

    displayName: string;

    optionCodes: string;

    color: string;

    state: string;

    inService: boolean;

    idS: string;

    calendarEnabled: boolean;

    apiVersion: number;

    backseatToken: string;

    backseatTokenUpdatedAt: string;

    // token: Token[];

    vehicleConfig: VehicleConfig;

    vehicleState: VehicleState;

    guiSettings: GuiSettings;

    driveState: DriverState;

    climateState: ClimateState;

    chargeState: ChargeState;

}
