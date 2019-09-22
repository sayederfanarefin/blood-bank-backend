import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Vehicle } from './Vehicle';

@Entity()
export class VehiclePricing {

    @PrimaryColumn('uuid')
    public id: string;

    @ManyToOne(type => Vehicle, vehicle => vehicle.vehiclePricing)
    @JoinColumn({ name: 'vehicle_id' })
    public vehicle: Vehicle;

    @Column()
    public battery: string;

    @Column()
    public powerTrain: string;

    @Column()
    public price: number;

    @Column()
    public miles: number;

    @Column()
    public date: Date;

}
