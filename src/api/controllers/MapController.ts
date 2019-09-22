import { Authorized, Get, JsonController, OnUndefined, Param } from 'routing-controllers';

import { MapBadRequestError } from '../errors/MapBadRequestError';
import { Map } from '../models/dto/asif/MapDTO';

// import { BatteryService } from '../services/BatteryService';

@Authorized()
@JsonController('/map')
export class MapController {

    @Get('/getMap/:vin/:date')
    @OnUndefined(MapBadRequestError)
    public get(
        @Param('vin') vin: string,
        @Param('date') date: string
        ): Promise<Map> {
        return undefined;
    }
}
