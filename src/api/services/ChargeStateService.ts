import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { ChargeEnableChartUnit } from '../models/dto/dashboard/ChargeEnableChartUnit';
import { ChargeState } from '../models/telematics/ChargeState';
import {
    ChargeStateRepository
} from '../repositories/telematicsRepositories/ChargeStateRepository';

import uuid = require('uuid');

@Service()
export class ChargeStateService {

    constructor(
        @OrmRepository() private chargeStateRepository: ChargeStateRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {

    }

    public find(): Promise<ChargeState[]> {
        this.log.info('Find all ChargeState');
        return this.chargeStateRepository.find();
    }

    public findOne(id: string): Promise<ChargeState> {
        this.log.info('Find one ChargeState');
        return this.chargeStateRepository.findOne({ id });
    }

    public async save(battery: ChargeState): Promise<ChargeState> {
        this.log.info('Create a new ChargeState => ', battery.toString());
        battery.id = uuid.v4();
        const newUser = await this.chargeStateRepository.save(battery);
        // this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, battery: ChargeState): Promise<ChargeState> {
        this.log.info('Update a ChargeState');
        battery.id = id;
        return this.chargeStateRepository.save(battery);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a ChargeState');
        await this.chargeStateRepository.delete(id);
        return;
    }

    public async getChargeEnableChart(vin: string): Promise<ChargeEnableChartUnit[]> {
        const currentTimeStamp: number = Date.now();
        const twenty4hoursBackTimeStamp: number = currentTimeStamp - 86400000;
        const chargeStates = await this.chargeStateRepository.createQueryBuilder('charge_state')
        .where('charge_state.vin = :vin', { vin })
        .andWhere('charge_state.timestamp < :currentTimeStamp', { currentTimeStamp })
        .andWhere('charge_state.timestamp > :twenty4hoursBackTimeStamp', { twenty4hoursBackTimeStamp })
        .getMany();
        // const toBeReturned = new ChargeEnableChartUnit[];
        // for ( const chargeState of chargeStates ) {
        //     chargeState
        // }
        return undefined;
    }
}
