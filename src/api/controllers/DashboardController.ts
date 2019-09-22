import {
    Authorized, Get, JsonController, OnUndefined, Param, QueryParam, Req
} from 'routing-controllers';

import { DashboardNotFoundError } from '../errors/DashboardNotFoundError';
import { Dashboard } from '../models/dto/asif/DashboardDTO';
import { SOC } from '../models/dto/asif/SOCDTO';
import { CardOne } from '../models/dto/dashboard/CardOne';
import { CardTwo } from '../models/dto/dashboard/CardTwo';
import { ChargeEnableChartUnit } from '../models/dto/dashboard/ChargeEnableChartUnit';
import { Details } from '../models/dto/dashboard/Details';
import { Stats } from '../models/dto/dashboard/Stats';
import { VehicleInformation } from '../models/dto/dashboard/VehicleInformation';
import { VehicleOptionCodes } from '../models/dto/dashboard/VehicleOptionCodes';
import { DashboardService } from '../services/DashboardService';

@Authorized()
@JsonController('/dashboard')
export class DashboardController {
    constructor(
        private dashboardService: DashboardService
    ) { }

    @Get('/:uid/:vin')
    @OnUndefined(DashboardNotFoundError)
    public async uidVin(@Param('uid') uid: string, @Param('vin') vin: string): Promise<Dashboard> {
       return undefined;
    }

    @Get('/getSOCLast24H/:vin')
    @OnUndefined(DashboardNotFoundError)
    public getSOCLast24H(@Param('vin') vin: string): Promise<SOC[]> {
        return undefined;
    }

    @Get('/vehicleInformation')
    @OnUndefined(DashboardNotFoundError)
    public async getCard1(@Req() req: any, @QueryParam('vin') vin: string): Promise<VehicleInformation> {
       console.log ('========>>>>>>> requesting for card1 from controller ' + req.user.userId + ' ... ' + vin);
        return await this.dashboardService.getVehicleInformation(req.user.userId, vin);
    }

    @Get('/details')
    @OnUndefined(DashboardNotFoundError)
    public async getDetails(@Req() req: any, @QueryParam('vin') vin: string): Promise<Details> {
        return await this.dashboardService.getDetails(req.user.userId, vin);
    }

    @Get('/stats')
    @OnUndefined(DashboardNotFoundError)
    public async getStats(@Req() req: any, @QueryParam('vin') vin: string): Promise<Stats> {
        return await this.dashboardService.getStats(req.user.userId, vin);
    }

    @Get('/card1')
    @OnUndefined(DashboardNotFoundError)
    public async getCardOne(@Req() req: any, @QueryParam('vin') vin: string): Promise<CardOne> {
        return await this.dashboardService.getCard1(req.user.userId, vin);
    }
    @Get('/card2')
    @OnUndefined(DashboardNotFoundError)
    public async getCardTwo(@Req() req: any, @QueryParam('vin') vin: string): Promise<CardTwo> {
        return await this.dashboardService.getCard2(req.user.userId, vin);
    }

    @Get('/vehicleOptionCodes')
    @OnUndefined(DashboardNotFoundError)
    public async getCardVehicleOptionCodes(@Req() req: any, @QueryParam('vin') vin: string): Promise<VehicleOptionCodes> {
        return await this.dashboardService.getVehicleOptionCodes(req.user.userId, vin);
    }

    @Get('/getChargeEnableChart')
    @OnUndefined(DashboardNotFoundError)
    public async getChargeEnableChart(@QueryParam('vin') vin: string): Promise<ChargeEnableChartUnit[]> {
        return await this.dashboardService.getChargeEnableChart( vin );
    }

}
