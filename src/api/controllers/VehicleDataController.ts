import { Authorized, Get, JsonController, OnUndefined, Param } from 'routing-controllers';

import { HourlyBadRequestError } from '../errors/HourlyBadRequestError';
import { HourlyNoRecordsError } from '../errors/HourlyNoRecordsError';
import { DailyDTO } from '../models/dto/asif/DailyDTO';
import { HourlyDTO } from '../models/dto/asif/HourlyDTO';
import { HourlyOdometerDTO } from '../models/dto/asif/HourlyOdometerDTO';
import { MonthlyDTO } from '../models/dto/asif/MonthlyDTO';
import { WeeklyDTO } from '../models/dto/asif/WeeklyDTO';

@Authorized()
@JsonController('/vehicleData')
export class VehicleDataController {

    @Get('/getHourlyData/:vin/:date/:hours')
    @OnUndefined(HourlyNoRecordsError)
    public getHourlyData(
         @Param('vin') vin: string,
         @Param('date') date: string,
         @Param('hours') hours: string
         ): Promise<HourlyDTO[]> {

        return undefined;
    }

    @Get('/getLast24HoursReading/:vin')
    @OnUndefined(HourlyBadRequestError)
    public getLast24HoursReading(
         @Param('vin') vin: string
         ): Promise<HourlyOdometerDTO[]> {

        return undefined;
    }

    @Get('getDailyData/:vin/:startDate/:endDate')
    @OnUndefined(HourlyNoRecordsError)
    public getDailyData(
         @Param('vin') vin: string,
         @Param('startDate') startDate: string,
         @Param('endDate') endDate: string
         ): Promise<DailyDTO[]> {

        return undefined;
    }

    @Get('/getWeeklyData/:vin/:date')
    @OnUndefined(HourlyNoRecordsError)
    public getWeeklyData(
         @Param('vin') vin: string,
         @Param('date') date: string
         ): Promise<WeeklyDTO> {

        return undefined;
    }

    @Get('/getMonthlyData/:vin/:date')
    @OnUndefined(HourlyNoRecordsError)
    public getMonthlyData(
         @Param('vin') vin: string,
         @Param('date') date: string
         ): Promise<MonthlyDTO> {

        return undefined;
    }

    @Get('/getAllMonthsData/:vin')
    @OnUndefined(HourlyNoRecordsError)
    public getAllMonthsData(
         @Param('vin') vin: string
         ): Promise<MonthlyDTO[]> {

        return undefined;
    }

}
