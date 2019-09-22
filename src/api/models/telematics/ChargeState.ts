import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleData } from './VehicleData';

@Entity()
export class ChargeState {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public vin: string;

    @Column({ nullable: true })
    public batteryHeaterOn: boolean;

     @Column('double precision', { nullable: true })
    public batteryLevel: number;

    @Column('double precision')
    public batteryRange: number;

     @Column('double precision', { nullable: true })
    public chargeCurrentRequest: number;

     @Column('double precision', { nullable: true })
    public chargeCurrentRequestMax: number;

     @Column({ nullable: true })
    public chargeEnableRequest: boolean;

     @Column('double precision', { nullable: true })
    public chargeEnergyAdded: number;

     @Column('double precision', { nullable: true })
    public chargeLimitSoc: number;

     @Column('double precision', { nullable: true })
    public chargeLimitSocMax: number;

     @Column('double precision', { nullable: true })
    public chargeLimitSocMin: number;

     @Column('double precision', { nullable: true })
    public chargeLimitSocStd: number;

     @Column('double precision', { nullable: true })
    public chargeMilesAddedIdeal: number;

     @Column('double precision', { nullable: true })
    public chargeMilesAddedRated: number;

     @Column({ nullable: true })
    public chargePortColdWeatherMode: string;

     @Column({ nullable: true })
    public chargePortDoorOpen: boolean;

     @Column({ nullable: true })
    public chargePortLatch: string;

     @Column('double precision', { nullable: true })
    public chargeRate: number;

     @Column({ nullable: true })
    public chargeToMaxRange: boolean;

     @Column('double precision', { nullable: true })
    public chargerActualCurrent: number;

     @Column({ nullable: true })
    public chargerPhases: string;

     @Column('double precision', { nullable: true })
    public chargerPilotCurrent: number;

     @Column('double precision', { nullable: true })
    public chargerPower: number;

     @Column('double precision', { nullable: true })
    public chargerVoltage: number;

     @Column({ nullable: true })
    public chargingState: string;

     @Column({ nullable: true })
    public connChargeCable: string;

    @Column('double precision')
    public estBatteryRange: number;

     @Column({ nullable: true })
    public fastChargerBrand: string;

     @Column({ nullable: true })
    public fastChargerPresent: boolean;

     @Column({ nullable: true })
    public fastChargerType: string;

    @Column('double precision')
    public idealBatteryRange: number;

     @Column({ nullable: true })
    public managedChargingActive: boolean;

     @Column({ nullable: true })
    public managedChargingStartTime: string;

     @Column({ nullable: true })
    public managedChargingUserCanceled: boolean;

     @Column('double precision', { nullable: true })
    public maxRangeChargeCounter: number;

     @Column({ nullable: true })
    public notEnoughPowerToHeat: boolean;

     @Column({ nullable: true })
    public scheduledChargingPending: boolean;

     @Column({ nullable: true })
    public scheduledChargingStartTime: string;

     @Column('double precision', { nullable: true })
    public timeToFullCharge: number;

     @Column({ type: 'bigint', nullable: true })
    public timestamp: number;

     @Column({ nullable: true })
    public tripCharging: boolean;

     @Column('double precision', { nullable: true })
    public usableBatteryLevel: number;

     @Column({ nullable: true })
    public userChargeEnableRequest: boolean;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    @OneToOne(type => VehicleData)
    @JoinColumn()
    public vehicleData: VehicleData;

    public toString(): string {
        return `${this.id}`;
    }
}
