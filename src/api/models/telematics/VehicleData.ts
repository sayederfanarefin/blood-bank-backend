import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

import { ChargeState } from './ChargeState';
import { ClimateState } from './ClimateState';
import { DriveState } from './DriveState';
import { GuiSettings } from './GuiSettings';
// import { Token } from './Token';
import { VehicleConfig } from './VehicleConfig';
import { VehicleState } from './VehicleState';

@Entity()
export class VehicleData {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public userId: string;

    @Column({ type: 'bigint' })
    public vehicleId: number;

    @Column({ nullable: true })
    public vin: string;

    @Column({ nullable: true })
    public displayName: string;

    @Column({ nullable: true })
    public optionCodes: string;

    @Column({ nullable: true })
    public color: string;

    @Column({ nullable: true })
    public state: string;

    @Column({ nullable: true })
    public inService: boolean;

    @Column({ type: 'bigint', nullable: true })
    public idS: string;

    @Column({ nullable: true })
    public calendarEnabled: boolean;

    @Column('double precision', { nullable: true })
    public apiVersion: number;

    @Column({ nullable: true })
    public backseatToken: string;

    @Column({ nullable: true })
    public backseatTokenUpdatedAt: string;

    // @OneToMany(type => Token, token => token.vehicleData)
    // public token: Token[];

    @OneToOne(type => VehicleConfig, vehicleConfig => vehicleConfig.vehicleData)
    public vehicleConfig: VehicleConfig;

    @OneToOne(type => VehicleState, vehicleState => vehicleState.vehicleData)  // , { cascade: true, onDelete: 'CASCADE' }
    public vehicleState: VehicleState;

    @OneToOne(type => GuiSettings, guiSettings => guiSettings.vehicleData)
    public guiSettings: GuiSettings;

    @OneToOne(type => DriveState, driveState => driveState.vehicleData)
    public driveState: DriveState;

    @OneToOne(type => ClimateState, climateState => climateState.vehicleData)
    public climateState: ClimateState;

    @OneToOne(type => ChargeState, chargeState => chargeState.vehicleData)
    public chargeState: ChargeState;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id}`;
    }
}
