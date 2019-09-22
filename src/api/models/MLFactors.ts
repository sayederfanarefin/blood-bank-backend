import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Vehicle } from './Vehicle';

@Entity()
export class MLFactors {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public k1: number;

    @Column()
    public k2: number;

    @ManyToOne(type => Vehicle, vehicle => vehicle.mlFactros)
    @JoinColumn({ name: 'vehicle_id' })
    public vehicle: Vehicle;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id} ${this.k1} ${this.k2} ${this.createdAt}`;
    }
}
