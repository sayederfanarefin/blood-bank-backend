import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Battery } from './Battery';
import { MLFactors } from './MLFactors';
import { UserVehicle } from './UserVehicle';
import { VehiclePricing } from './VehiclePricing';

@Entity()
export class Vehicle {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public name: string;

    @Column()
    public model: string;

    @Column()
    public year: number;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    @OneToMany(type => UserVehicle, userVehicle => userVehicle.vehicle)
    public userVehicles: UserVehicle[];

    @OneToMany(type => MLFactors, mLFactors => mLFactors.vehicle)
    public mlFactros: MLFactors[];

    @OneToMany(type => Battery, battery => battery.vehicle)
    public batteries: Battery[];

    @OneToMany(type => VehiclePricing, vehiclePricing => vehiclePricing.vehicle)
    public vehiclePricing: VehiclePricing[];

    public toString(): string {
        return `${this.id} ${this.name} ${this.model} ${this.year}`;
    }
}
