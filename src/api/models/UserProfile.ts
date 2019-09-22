// import { IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class UserProfile {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public phoneNumber: string;

    @Column()
    public companyName: string;

    @Column()
    public avatar: string;

    @Column()
    public employeeId: string;

    @Column()
    public distanceUnit: string;

    @Column()
    public zoneId: string;

    @Column()
    public currency: string;

    @OneToOne(type => User)
    @JoinColumn()
    public user: User;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;
  }
