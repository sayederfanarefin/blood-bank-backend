import { Authorized, Get, JsonController } from 'routing-controllers';

// import { BatteryService } from '../services/BatteryService';

@Authorized()
@JsonController('/landing')
export class LandingController {

    @Get('/')
    public get(): Promise<any> {
        // do something
        console.log('==========================as');
        return undefined;
    }
}
