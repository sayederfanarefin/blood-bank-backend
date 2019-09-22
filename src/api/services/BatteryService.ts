import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Battery } from '../models/Battery';
import { BatteryDTO } from '../models/dto/BatteryDTO';
import { BatteryRepository } from '../repositories/BatteryRepository';

import uuid = require('uuid');

@Service()
export class BatteryService {

    constructor(
        @OrmRepository() private batteryRepository: BatteryRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {

    }
    public async findBatteryDTO(): Promise<BatteryDTO[]> {
        this.log.info('Find all BatteryDTO');
        return await this.batteryRepository.find().then( ( battery ) => battery.map((dto: BatteryDTO) => {
            return this.toBatteryDTO(dto);
        }));
    }

    public async findBatteryDTOLimit( starting: number, ending: number ): Promise<BatteryDTO[]> {
        this.log.info('Find all BatteryDTO');
        return await this.batteryRepository.createQueryBuilder().skip(starting).take(ending).getMany().then( ( battery ) => battery.map((dto: BatteryDTO) => {
            return this.toBatteryDTO(dto);
        }));
    }

    public find(): Promise<Battery[]> {
        this.log.info('Find all Battery');
        return this.batteryRepository.find();
    }

    // public async sPlotAll(): Promise<SplotDTO[]> {
    //     this.log.info('Find all Battery and then convert them to splot dto for scatter plot');
    //     return await this.batteryRepository.find().then( ( battery ) => battery.map((dto: SplotDTO) => {
    //         return this.toBatteryDTO(dto);
    //     }));
    // }

    public findOne(id: string): Promise<Battery> {
        this.log.info('Find one Battery');
        return this.batteryRepository.findOne({ id });
    }

    public async create(battery: Battery): Promise<Battery> {
        this.log.info('Create a new Battery => ', battery.toString());
        battery.id = uuid.v4();
        const newUser = await this.batteryRepository.save(battery);
        // this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, battery: Battery): Promise<Battery> {
        this.log.info('Update a Battery');
        battery.id = id;
        return this.batteryRepository.save(battery);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a Battery');
        await this.batteryRepository.delete(id);
        return;
    }

    private toBatteryDTO(batteryDTO: BatteryDTO): Battery {
        const battery = new Battery();
        battery.km = batteryDTO.km;
        battery.originalRange = parseFloat(batteryDTO.originalRange.toFixed(2));
        return battery;
    }

    // private toSplotDTO( splotDTO: SplotDTO): Battery {
    //     const battery = new Battery();
    //     battery.km = splotDTO.odometer;
    //     battery.originalRange = parseFloat(splotDTO.originalRange.toFixed(2));
    //     return battery;
    // }

}
