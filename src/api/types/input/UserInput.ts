import { Field, InputType, Int } from 'type-graphql';

import { User } from '../User';

@InputType()
export class UserInput implements Partial<User> {

    @Field({
        description: 'The first name of the user.',
    })
    public firstName: string;

    @Field({
        description: 'The last name of the user.',
    })
    public lastName: string;

    @Field({
        description: 'The email of the user.',
    })
    public email: string;

    @Field({
        description: 'The password of the user.',
    })
    public password: string;

    @Field(type => Int, {
        description: 'The age of the user.',
    })
    public age: number;

    @Field({
        description: 'The gender  of the user.',
    })
    public gender: string;

    @Field({
        description: 'The profilePictureUrl  of the user.',
    })
    public profilePictureUrl: string;

    @Field({
        description: 'The use of car of the user.',
    })
    public useOfCar: string;
}
