import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { VehicleData } from './VehicleData';

@Entity()
export class GuiSettings {

    @PrimaryColumn('uuid')
    public id: string;

    @OneToOne(type => VehicleData)
    @JoinColumn()
    public vehicleData: VehicleData;

    //  @Column({ nullable: true })
    // public userId: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

     @Column({ nullable: true })
    public gui24HourTime: boolean;

     @Column({ nullable: true })
    public guiChargeRateUnits: string;

     @Column({ nullable: true })
    public guiDistanceUnits: string;

     @Column({ nullable: true })
    public guiRangeDisplay: string;

     @Column({ nullable: true })
    public guiTemperatureUnits: string;

    //  @Column({ nullable: true })
    // public timestamp: number;

    public toString(): string {
        return `${this.id}`;
    }
}
