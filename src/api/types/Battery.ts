import { Field, ID, ObjectType } from 'type-graphql';

import { Vehicle } from './Vehicle';

@ObjectType({
    description: 'Battery object.',
})
export class Battery {

    @Field(type => ID)
    public id: string;

    @Field({
        description: 'The km of the Battery.',
    })
    public km: number;

    @Field({
        description: 'The typicalRangeOfNew of the Battery.',
    })
    public typicalRangeOfNew: number;

    @Field({
        description: 'The originalRange of the Battery.',
    })
    public originalRange: number;

    @Field({
        description: 'The typicalRangeAfter of the Battery.',
    })
    public typicalRangeAfter: number;

    @Field({
        description: 'The createdAt of the Battery.',
    })
    public createdAt: string;

    @Field({
        description: 'The userVehicle of the Battery.',
    })
    public vehicle: Vehicle;
}
