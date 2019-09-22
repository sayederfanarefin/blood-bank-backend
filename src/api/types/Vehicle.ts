import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
    description: 'Vehicle object.',
})
export class Vehicle {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The name of the Vehicle.',
    })
    public name: string;

    @Field({
        description: 'The model of the Vehicle.',
    })
    public model: string;

    @Field({
        description: 'The year of the Vehicle.',
    })
    public year: number;

}
