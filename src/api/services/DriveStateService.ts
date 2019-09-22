import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { DriveState } from '../models/telematics/DriveState';
import { DriveStateRepository } from '../repositories/telematicsRepositories/DriveStateRepository';

import uuid = require('uuid');

@Service()
export class DriveStateService {

    constructor(
        @OrmRepository() private batteryRepository: DriveStateRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public find(): Promise<DriveState[]> {
        this.log.info('Find all DriveState');
        return this.batteryRepository.find();
    }

    public findOne(id: string): Promise<DriveState> {
        this.log.info('Find one DriveState');
        return this.batteryRepository.findOne({ id });
    }

    public async save(battery: DriveState): Promise<DriveState> {
        this.log.info('Create a new DriveState => ', battery.toString());
        battery.id = uuid.v4();
        const newUser = await this.batteryRepository.save(battery);
        // this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, battery: DriveState): Promise<DriveState> {
        this.log.info('Update a DriveState');
        battery.id = id;
        return this.batteryRepository.save(battery);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a DriveState');
        await this.batteryRepository.delete(id);
        return;
    }

}
