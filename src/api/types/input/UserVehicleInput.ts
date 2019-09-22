import { Field, InputType } from 'type-graphql';

import { UserVehicle } from '../UserVehicle';
import { VehicleInput } from './VehicleInput';

@InputType()
export class UserVehicleInput implements Partial<UserVehicle> {

    @Field({
        description: 'The name of the Vehicle.',
    })
    public name: string;

    @Field({
        description: 'The vin of the Vehicle.',
    })
    public vin: string;

    @Field({
        description: 'The teslaUsername of the Vehicle.',
    })
    public teslaUsername: string;

    @Field({
        description: 'The teslaPassword of the Vehicle.',
    })
    public teslaPassword: string;

    @Field({
        description: 'The Vehicle of the User.',
    })
    public vehicleInput: VehicleInput;
}
