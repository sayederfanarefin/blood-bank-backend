import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleState } from './VehicleState';

@Entity()
export class MediaState {

    @PrimaryColumn('uuid')
    public id: string;

    @OneToOne(type => VehicleState)
    @JoinColumn()
    public vehicleState: VehicleState;

     @Column({ nullable: true })
    public remoteControlEnabled: boolean;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id}`;
    }
}
