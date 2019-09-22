import { Field, InputType } from 'type-graphql';

import { Driver } from '../Driver';
import { UserVehicleInput } from './UserVehicleInput';

@InputType()
export class DriverInput implements Partial<Driver> {

    @Field({
        description: 'The name of the Driver.',
    })
    public name: string;

    @Field({
        description: 'The phoneNumber of the Driver.',
    })
    public phoneNumber: string;

    @Field({
        description: 'The age of the Driver.',
    })
    public age: number;

    @Field({
        description: 'The emergencyContact of the Driver.',
    })
    public emergencyContact: string;

    @Field({
        description: 'The profilePictureUrl of the Driver.',
    })
    public profilePictureUrl: string;

    @Field({
        description: 'The gender of the Driver.',
    })
    public gender: string;

    @Field({
        description: 'The licenseExpirationDate of the Driver.',
    })
    public licenseExpirationDate: string;

    @Field({
        description: 'The UserVehicle of the Driver.',
    })
    public userVehicleInput: UserVehicleInput;

}
