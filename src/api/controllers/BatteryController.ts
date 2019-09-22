import {
    Authorized, Body, Delete, Get, JsonController, OnUndefined, Param, Post, Put
} from 'routing-controllers';

import { BatteryNotFoundError } from '../errors/BatteryNotFoundError';
import { Battery } from '../models/Battery';
import { BatteryService } from '../services/BatteryService';

@Authorized()
@JsonController('/battery')
export class BatteryController {

    constructor(
        private batteryService: BatteryService
    ) { }

    @Get()
    public find(): Promise<Battery[]> {
        return this.batteryService.find();
    }

    @Get('/:id')
    @OnUndefined(BatteryNotFoundError)
    public one(@Param('id') id: string): Promise<Battery> {
        return this.batteryService.findOne(id);
    }

    @Post()
    public create(@Body() battery: Battery): Promise<Battery> {
        return this.batteryService.create(battery);
    }

    @Put('/:id')
    public update(@Param('id') id: string, @Body() battery: Battery): Promise<Battery> {
        return this.batteryService.update(id, battery);
    }

    @Delete('/:id')
    public delete(@Param('id') id: string): Promise<void> {
        return this.batteryService.delete(id);
    }

}
