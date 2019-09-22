import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleData } from './VehicleData';

@Entity()
export class ClimateState {

    @PrimaryColumn('uuid')
    public id: string;

    @OneToOne(type => VehicleData)
    @JoinColumn()
    public vehicleData: VehicleData;

     @Column({ nullable: true })
    public batteryHeater: boolean;
     @Column({ nullable: true })
    public batteryHeaterNoPower: boolean;

    @Column('double precision')
    public driverTempSetting: number;

     @Column('double precision', { nullable: true })
    public fanStatus: number;

     @Column('double precision', { nullable: true })
    public insideTemp: number;

     @Column({ nullable: true })
    public isAutoConditioningOn: boolean;

     @Column({ nullable: true })
    public isClimateOn: boolean;

     @Column({ nullable: true })
    public isFrontDefrosterOn: boolean;

     @Column({ nullable: true })
    public isPreconditioning: boolean;

     @Column({ nullable: true })
    public isRearDefrosterOn: boolean;

     @Column('double precision', { nullable: true })
    public leftTempDirection: number;

     @Column('double precision', { nullable: true })
    public maxAvailTemp: number;

     @Column('double precision', { nullable: true })
    public minAvailTemp: number;

     @Column('double precision', { nullable: true })
    public outsideTemp: number;

    @Column('double precision')
    public passengerTempSetting: number;

     @Column({ nullable: true })
    public remoteHeaterControlEnabled: boolean;

     @Column('double precision', { nullable: true })
    public rightTempDirection: number;

     @Column('double precision', { nullable: true })
    public seatHeaterLeft: number;

     @Column('double precision', { nullable: true })
    public seatHeaterRearCenter: number;

     @Column('double precision', { nullable: true })
    public seatHeaterRearLeft: number;

     @Column('double precision', { nullable: true })
    public seatHeaterRearRight: number;

     @Column('double precision', { nullable: true })
    public seatHeaterRight: number;

     @Column('double precision', { nullable: true })
    public seatHeaterThirdRowLeft: number;

     @Column('double precision', { nullable: true })
    public seatHeaterThirdRowRight: number;

     @Column({ nullable: true })
    public sideMirrorHeaters: boolean;
     @Column({ nullable: true })
    public smartPreconditioning: boolean;
     @Column({ nullable: true })
    public steeringWheelHeater: boolean;
    //  @Column({ nullable: true })
    // public timestamp: number;
     @Column({ nullable: true })
    public wiperBladeHeater: boolean;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
    return `${this.id}`;
    }
}
