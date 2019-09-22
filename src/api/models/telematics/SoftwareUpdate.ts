import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleState } from './VehicleState';

@Entity()
export class SoftwareUpdate {

    @PrimaryColumn('uuid')
    public id: string;

    @OneToOne(type => VehicleState)
    @JoinColumn()
    public vehicleState: VehicleState;

     @Column('double precision', { nullable: true })
    public expectedDurationSec: number;

     @Column({ nullable: true })
    public  status: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id}`;
    }
}
