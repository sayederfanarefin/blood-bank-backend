import { validate } from 'class-validator';

import { User } from '../../../src/api/models/User';

describe('UserValidations', () => {

    test('User should always have a first name', async (done) => {
        const user = new User();
        const errorsOne = await validate(user);
        user.firstName = 'TestName';
        const errorsTwo = await validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });
    test('User should always have a email', async (done) => {
        const user = new User();
        const errorsOne = await validate(user);
        user.email = 'test@test.com';
        const errorsTwo = await validate(user);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    // test('User should always be above age 18', async (done) => {
    //     const user = new User();
    //     user.age = 12;
    //     const errorsOne = await validate(user);
    //     user.age = 18;
    //     const errorsTwo = await validate(user);
    //     expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    //     done();
    // });

    // test('User should always have a gender', async (done) => {
    //     const user = new User();
    //     const errorsOne = await validate(user);
    //     user.gender = "male";
    //     const errorsTwo = await validate(user);
    //     expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    //     done();
    // });

    // test('User should always have a password length of 8', async (done) => {
    //     const user = new User();
    //     user.password = "abcd";
    //     const errorsOne = await validate(user);
    //     user.password = "abcd1234";
    //     const errorsTwo = await validate(user);
    //     expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
    //     done();
    // });

});
