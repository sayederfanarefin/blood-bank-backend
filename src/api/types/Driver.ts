import { Field, ID, ObjectType } from 'type-graphql';

import { UserVehicle } from './UserVehicle';

@ObjectType({
    description: 'Driver object.',
})
export class Driver {

    @Field(type => ID)
    public id: string;

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
        description: 'The userVehicle of the Driver.',
    })
    public userVehicle: UserVehicle;
}
