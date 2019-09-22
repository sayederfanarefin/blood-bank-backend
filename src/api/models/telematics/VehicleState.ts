import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { MediaState } from './MediaState';
import { SoftwareUpdate } from './SoftwareUpdate';
import { SpeedLimitMode } from './SpeedLimitMode';
import { VehicleData } from './VehicleData';

@Entity()
export class VehicleState {

    @PrimaryColumn('uuid')
    public id: string;

    @OneToOne(type => VehicleData)
    @JoinColumn()
    public vehicleData: VehicleData;

    @Column('double precision', { nullable: true })
    public apiVersion: number;

    @Column({ nullable: true })
    public autoparkStateV2: string;

    @Column({ nullable: true })
    public autoparkStyle: string;

    @Column({ nullable: true })
    public calendarSupported: boolean;

    @Column({ nullable: true })
    public carVersion: string;

    @Column('double precision', { nullable: true })
    public centerDisplayState: number;

    @Column('double precision', { nullable: true })
    public df: number;

    @Column('double precision', { nullable: true })
    public dr: number;

    @Column('double precision', { nullable: true })
    public ft: number;

    @Column( { nullable: true })
    public homelinkNearby: boolean;

    @Column({ nullable: true })
    public isUserPresent: boolean;

    @Column({ nullable: true })
    public lastAutoparkError: string;

    @Column({ nullable: true })
    public locked: boolean;

    @Column({ nullable: true })
    public notificationsSupported: boolean;

    @Column('double precision')
    public odometer: number;

    @Column( { nullable: true })
    public parsedCalendarSupported: boolean;

    @Column('double precision', { nullable: true })
    public pf: number;

    @Column('double precision', { nullable: true })
    public pr: number;

    @Column( { nullable: true })
    public remoteStart: boolean;

    @Column({ nullable: true })
    public remoteStartEnabled: boolean;

    @Column({ nullable: true })
    public remoteStartSupported: boolean;

    @Column('double precision', { nullable: true })
    public rt: number;

    @Column({ nullable: true })
    public sentryMode: boolean;

    @OneToOne(type => SoftwareUpdate, softwareUpdate => softwareUpdate.vehicleState )
    public softwareUpdate: SoftwareUpdate;

    @OneToOne(type => SpeedLimitMode, speedLimitMode => speedLimitMode.vehicleState)
    public speedLimitMode: SpeedLimitMode;

    @OneToOne(type => MediaState, mediaState => mediaState.vehicleState) // , { cascade: true, onDelete: 'CASCADE' }
    public mediaState: MediaState;

    @Column('double precision', { nullable: true })
    public  sunRoofPercentOpen: number;

    @Column({ nullable: true })
    public sunRoofState: string;

    //  @Column({ nullable: true })
    // public timestamp: number;

    @Column({ nullable: true })
    public valetMode: boolean;

    @Column({ nullable: true })
    public valetPinNeeded: boolean;

    @Column({ nullable: true })
    public vehicleName: string;

}
