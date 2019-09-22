// import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, Unique } from 'typeorm';

import { UserProfile } from './UserProfile';
import { UserVehicle } from './UserVehicle';

@Unique ([ 'id', 'email'])
@Entity()
export class User {

    @PrimaryColumn('uuid')
    public id: string;

    @Column({ name: 'first_name' })
    public firstName: string;

    // @Column({ name: 'last_name' })
    // public lastName: string;

    @IsEmail()
    @Column()
    public email: string;

    @MinLength(8)
    @Exclude()
    public password: string;

    @Column()
    public age: number;

    // @IsFQDN()
    // @Column({ name: 'profile_picture_url' })
    // public profilePictureUrl: string;

    @Column()
    public gender: string;

    @Column()
    public numberOfCars: number;

    @Column({ name: 'use_of_car' })
    public useOfCar: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    @OneToMany(type => UserVehicle, userVehicle => userVehicle.user)
    public userVehicles: UserVehicle[];

    @OneToOne(type => UserProfile, userProfile => userProfile.user)
    public userProfile: UserProfile;

    public toString(): string {
        return `${this.firstName} (${this.email})`;
    }
}
