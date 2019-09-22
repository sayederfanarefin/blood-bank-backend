import { Authorized, Get, JsonController, OnUndefined, QueryParam } from 'routing-controllers';

import { PlotNotFoundError } from '../errors/PlotNotFoundError';
import { BatteryDTO } from '../models/dto/BatteryDTO';
import { BatteryService } from '../services/BatteryService';

@Authorized()
@JsonController('/splot')
export class ScatterPlotController {

    constructor(
         private batteryService: BatteryService
      ) {
        //   console.log('dummy value');
       }

    @Get('/all')
    @OnUndefined(PlotNotFoundError)
    public async getAllSplot(): Promise<BatteryDTO[]> {
            return await this.batteryService.findBatteryDTO();
    }
    @Get('/all/:starting/:ending')
    @OnUndefined(PlotNotFoundError)
    public async getAllSplotWithLimit( @QueryParam('starting') starting: number, @QueryParam('ending') ending: number): Promise<BatteryDTO[]> {
            return await this.batteryService.findBatteryDTOLimit(starting, ending);
    }
}
