import * as ct from 'countries-and-timezones';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';

@Service()
export class TimeZoneService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {

    }
    public async getAllTimeZones(): Promise< any > {
        const timezones = ct.getAllTimezones();
        this.log.info(timezones);
        return timezones;
    }
}
