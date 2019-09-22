import {
    Authorized, Get, HttpCode, JsonController, OnUndefined, QueryParam
} from 'routing-controllers';

import { HistogramNotFoundError } from '../errors/HistogramNotFoundError';
import { HistogramDTO } from '../models/dto/HistogramDTO';
// import { VehiclePricingStats } from '../models/VehiclePricingStats';
// import { Bucket } from '../models/dto/Bucket';
// import { BatteryService } from '../services/BatteryService';
import { VehiclePricingService } from '../services/VehiclePricingService';

@JsonController('/histogram')
export class HistogramController {

    constructor(
        // private batteryService: BatteryService,
        private vehiclePricingService: VehiclePricingService
      ) {
        //   console.log('dummy value');
       }
    @Authorized()
    @Get('/get')
    @OnUndefined(HistogramNotFoundError)
    public async getHistogramMakeModelYearBattery(
        @QueryParam('year') year: string,
        @QueryParam('make') make: string,
        @QueryParam('model') model: string,
        @QueryParam('battery') battery: string
        ): Promise<HistogramDTO[]> {
        return await this.vehiclePricingService.histogramMakeModelYearBattery ( year, model, make, battery );
    }

    // @Get('/get')
    // @OnUndefined(HistogramNotFoundError)
    // public async getHistogramMakeModelYear(
    //     @QueryParam('year') year: string,
    //     @QueryParam('make') make: string,
    //     @QueryParam('model') model: string
    //     ): Promise<VehiclePricingStats[]> {
    //     return await this.vehiclePricingService.histogramMakeModelYear ( year, model, make );
    // }

    // @Get('/get')
    // @OnUndefined(HistogramNotFoundError)
    // public async getHistogramMakeModel(
    //     @QueryParam('make') make: string,
    //     @QueryParam('model') model: string
    //     ): Promise<VehiclePricingStats[]> {
    //     return await this.vehiclePricingService.histogramMakeModel (  model, make );
    // }
    @Authorized()
    @Get('/getAll')
    @OnUndefined(HistogramNotFoundError)
    public async getHistogram( ): Promise<HistogramDTO[]> {
        return await this.vehiclePricingService.histogram();
    }

    @Get('/generateStats')
    @HttpCode(204)
    @OnUndefined(HistogramNotFoundError)
    public async generateStats(): Promise<any> {
        console.log ( '===i am xxxx1');
        return await this.vehiclePricingService.measuresForHistogram();
    }

}
