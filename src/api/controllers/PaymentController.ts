import { Authorized, Body, JsonController, OnUndefined, Post } from 'routing-controllers';

import { PaymentErrorBadRequest } from '../errors/PaymentErrorBadRequest';
import { Payment } from '../models/dto/asif/PaymentDTO';

// import { BatteryService } from '../services/BatteryService';

@Authorized()
@JsonController('/payment')
export class PatmentController {

    @Post('/post')
    @OnUndefined(PaymentErrorBadRequest)
    public post(
        @Body() payment: Payment): Promise<boolean> {
        return undefined;
    }
}
