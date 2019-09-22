import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleData } from './VehicleData';

@Entity()
export class VehicleConfig {

    @PrimaryColumn('uuid')
    public id: string;

    @OneToOne(type => VehicleData)
    @JoinColumn()
    public vehicleData: VehicleData;

     @Column({ nullable: true })
    public canAcceptNavigationRequests: boolean;
     @Column({ nullable: true })
    public canActuateTrunks: boolean;
     @Column({ nullable: true })
    public carSpecialType: string;
     @Column({ nullable: true })
    public carType: string;
     @Column({ nullable: true })
    public chargePortType: string;
     @Column({ nullable: true })
    public euVehicle: boolean;
     @Column({ nullable: true })
    public exteriorColor: string;
     @Column({ nullable: true })
    public hasAirSuspension: boolean;
     @Column({ nullable: true })
    public hasLudicrousMode: boolean;
     @Column({ nullable: true })
    public motorizedChargePort: boolean;
     @Column({ nullable: true })
    public perfConfig: string;
     @Column({ nullable: true })
    public plg: boolean;

     @Column('double precision', { nullable: true })
    public rearSeatHeaters: number;

     @Column('double precision', { nullable: true })
    public rearSeatType: number;

     @Column({ nullable: true })
    public rhd: boolean;

     @Column({ nullable: true })
    public roofColor: string;

     @Column('double precision', { nullable: true })
    public seatType: number;

     @Column({ nullable: true })
    public spoilerType: string;

     @Column('double precision', { nullable: true })
    public sunRoofInstalled: number;
     @Column({ nullable: true })
    public thirdRowSeats: string;
    // @Column('bigint')
    // public timestamp: number;
     @Column({ nullable: true })
    public trimBadging: string;
     @Column({ nullable: true })
    public wheelType: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id}`;
    }
}
