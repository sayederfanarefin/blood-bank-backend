import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType({
    description: 'User object.',
})
export class User {

    @Field(type => ID)
    public id: string;

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
        description: 'The age of the user.',
    })
    public age: number;

    @Field({
        description: 'The gender  of the user.',
    })
    public gender: string;

    @Field({
        description: 'The profile picture url of the user.',
    })
    public profilePictureUrl: string;

    @Field({
        description: 'The use of car of the user.',
    })
    public useOfCar: string;

}
