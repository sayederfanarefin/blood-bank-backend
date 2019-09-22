import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Vehicle } from '../models/Vehicle';
import { VehicleRepository } from '../repositories/VehicleRepository';

@Service()
export class VehicleService {

    constructor(
        @OrmRepository() private vehicleRepository: VehicleRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {

    }
    public find(): Promise<Vehicle[]> {
        this.log.info('Find all vehicle');
        return this.vehicleRepository.find();
    }

    public findOne(id: string): Promise<Vehicle> {
        this.log.info('Find one vehicle ' + id);
        const result = this.vehicleRepository.findOne({ id });
        this.log.info (' got result: ' + result);
        return result;
    }

    public findWithModelName(modelString: string, nameString: string): Promise<Vehicle> {
        const result = this.vehicleRepository.findOne({
            where: {
                model: modelString,
                name: nameString,
             }});
        this.log.info (' got result: ' + result);
        return result;
    }

    public findWithNameYearModel(nameString: string, year: number, modelString: string): Promise<Vehicle> {
        return this.vehicleRepository.findOne({
            where: {
                model: modelString,
                name: nameString,
                year,
             }});
    }

    public update(id: string, vehicle: Vehicle): Promise<Vehicle> {
        this.log.info('Update a Vehicle');
        vehicle.id = id;
        return this.vehicleRepository.save(vehicle);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a Vehicle');
        await this.vehicleRepository.delete(id);
        return;
    }

}
