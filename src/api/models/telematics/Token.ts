import { Column, Entity, PrimaryColumn } from 'typeorm';

// import { VehicleData } from './VehicleData';

@Entity()
export class Token {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public token: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    // @ManyToOne(type => VehicleData, vehicleData => vehicleData.token)
    // @JoinColumn({ name: 'vehicleData_id' })
    // public vehicleData: VehicleData;

    public toString(): string {
        return `${this.id}`;
    }

}
