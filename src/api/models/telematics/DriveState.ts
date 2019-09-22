import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleData } from './VehicleData';

@Entity()
export class DriveState {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public vin: string;

    @OneToOne(type => VehicleData)
    @JoinColumn()
    public vehicleData: VehicleData;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    @Column('double precision', { nullable: true })
    public gpsAsOf: number;

     @Column('double precision', { nullable: true })
    public heading: number;

    @Column('double precision', { nullable: true })
    public latitude: number;

    @Column('double precision', { nullable: true })
    public longitude: number;

    @Column('double precision', { nullable: true })
    public nativeLatitude: number;

     @Column('double precision', { nullable: true })
    public nativeLocationSupported: number;

    @Column('double precision', { nullable: true })
    public nativeLongitude: number;

     @Column({ nullable: true })
    public nativeType: string;

     @Column('double precision', { nullable: true })
    public power: number;

     @Column({ nullable: true })
    public shiftState: string;

     @Column('double precision', { nullable: true })
    public speed: number;

     @Column({ type: 'bigint',  nullable: true })
    public timestamp: number;

    public toString(): string {
    return `${this.id}`;
    }
}
