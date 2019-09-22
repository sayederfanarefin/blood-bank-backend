import { validate } from 'class-validator';

import { UserVehicle } from '../../../src/api/models/UserVehicle';

describe('UserVehicleValidations', () => {

    test('UserVehicle should always have a name', async (done) => {
        const userVehicle = new UserVehicle();
        const errorsOne = await validate(userVehicle);
        userVehicle.name = 'TestName';
        const errorsTwo = await validate(userVehicle);
        expect(errorsOne.length).toEqual(errorsTwo.length);
        done();
    });

    test('UserVehicle should always have a vin', async (done) => {
        const userVehicle = new UserVehicle();
        const errorsOne = await validate(userVehicle);
        userVehicle.vin = 'fsdf8015201107480';
        const errorsTwo = await validate(userVehicle);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('UserVehicle should always have a teslaUsername', async (done) => {
        const userVehicle = new UserVehicle();
        const errorsOne = await validate(userVehicle);
        userVehicle.teslaUsername = "tesla user name";
        const errorsTwo = await validate(userVehicle);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('UserVehicle should always have a teslaPassword', async (done) => {
        const userVehicle = new UserVehicle();
        const errorsOne = await validate(userVehicle);
        userVehicle.teslaPassword = "testPassword";
        const errorsTwo = await validate(userVehicle);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });
});
