import { Field, InputType } from 'type-graphql';

import { Vehicle } from '../Vehicle';

@InputType()
export class VehicleInput implements Partial<Vehicle> {

    @Field({
        description: 'The id of the Vehicle.',
        nullable: true,
    })
    public id: string;

    @Field({
        description: 'The name of the Vehicle.',
        nullable: true,
    })
    public name: string;

    @Field({
        description: 'The model of the Vehicle.',
        nullable: true,
    })
    public model: string;

    @Field({
        description: 'The year of the Vehicle.',
        nullable: true,
    })
    public year: number;

}
