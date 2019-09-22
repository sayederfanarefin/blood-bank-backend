import { Vehicle } from '../../../src/api/models/Vehicle';
import { VehicleService } from '../../../src/api/services/VehicleService';
import { LogMock } from '../lib/LogMock';
import { RepositoryMock } from '../lib/RepositoryMock';

describe('VehicleService', () => {

    test('Find should return a list of Vehicle', async (done) => {
        const log = new LogMock();
        const repo = new RepositoryMock();
        const vehicle = new Vehicle();
        vehicle.id = '1';
        vehicle.name = 'John';
        vehicle.model = 'Doe';
        vehicle.year = 2005;

        repo.list = [vehicle];
        const vehicleService = new VehicleService(repo as any, log);
        const list = await vehicleService.find();
        expect(list[0].id).toBe(vehicle.id);
        done();
    });


});
