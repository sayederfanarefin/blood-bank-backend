import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleState } from './VehicleState';

@Entity()
export class SpeedLimitMode {

    @PrimaryColumn('uuid')
    public id: string;

    @OneToOne(type => VehicleState)
    @JoinColumn()
    public vehicleState: VehicleState;

     @Column({ nullable: true })
    public active: boolean;

     @Column('double precision', { nullable: true })
    public currentLimitMph: number;

     @Column('double precision', { nullable: true })
    public maxLimitMph: number;

     @Column('double precision', { nullable: true })
    public minLimitMph: number;

     @Column({ nullable: true })
    public pinCodeSet: boolean;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id}`;
    }
}
