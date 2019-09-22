import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
    description: 'UserVehicle object.',
})
export class UserVehicle {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The name of the UserVehicle.',
    })
    public name: string;

    @Field({
        description: 'The vin of the UserVehicle.',
    })
    public vin: string;

    @Field({
        description: 'The teslaUsername of the UserVehicle.',
    })
    public teslaUsername: string;

    @Field({
        description: 'The teslaPassword of the UserVehicle.',
    })
    public teslaPassword: string;

}
