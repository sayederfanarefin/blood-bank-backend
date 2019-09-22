import { validate } from 'class-validator';

import { Vehicle } from '../../../src/api/models/Vehicle';

describe('VehicleValidations', () => {

    test('Vehicle should always have a name', async (done) => {
        const vehicle = new Vehicle();
        const errorsOne = await validate(vehicle);
        vehicle.name = 'TestName';
        const errorsTwo = await validate(vehicle);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('Vehicle should always have a model', async (done) => {
        const vehicle = new Vehicle();
        const errorsOne = await validate(vehicle);
        vehicle.model = 'TestModel';
        const errorsTwo = await validate(vehicle);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

    test('Vehicle should always have a year', async (done) => {
        const vehicle = new Vehicle();
        const errorsOne = await validate(vehicle);
        vehicle.year = 2015;
        const errorsTwo = await validate(vehicle);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });


});
