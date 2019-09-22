import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

// import { Driver } from './Driver';
import { User } from './User';
import { Vehicle } from './Vehicle';

@Entity()
export class UserVehicle {
    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public name: string; // Name of the vehicle

    @Column()
    public vin: string; // vehicle identification number

    @Column({ name: 'tesla_username' })
    public teslaUsername: string;

    @Column({ name: 'tesla_password' })
    public teslaPassword: string;

    @Column({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public createdAt: string;

    @Column()
    public timeZone: string;

    @ManyToOne(type => Vehicle, vehicle => vehicle.userVehicles)
    @JoinColumn({ name: 'vehicle_id' })
    public vehicle: Vehicle;

    @ManyToOne(type => User, user => user.userVehicles)
    @JoinColumn({ name: 'user_id' })
    public user: User;

    @Column()
    public vehicleStartDate: string; // When vehicle was registered in system

    // @Column({ nullable: true })
    // public hasAirSuspension: boolean; // Has Air Suspension

    @Column('float')
    public startOdometer: number; // Latest reading of odometer

    @Column({ nullable: true })
    public plateNumber: string;

    public toString(): string {
        return `${this.id} ${this.name} ${this.vin}`;
    }
}
