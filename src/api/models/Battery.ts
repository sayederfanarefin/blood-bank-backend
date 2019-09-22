import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Vehicle } from './Vehicle';

@Entity()
export class Battery {

    @PrimaryColumn('uuid')
    public id: string;

    @Column('float')
    public km: number;

    @Column('float')
    public typicalRangeOfNew: number;

    @Column('float')
    public originalRange: number;

    @Column('float')
    public typicalRangeAfter: number;

    @ManyToOne(type => Vehicle, vehicle => vehicle.batteries)
    @JoinColumn({ name: 'vehicle_id' })
    public vehicle: Vehicle;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id} ${this.km} ${this.createdAt} ${this.typicalRangeOfNew} ${this.originalRange} ${this.typicalRangeAfter}`;
    }
}
