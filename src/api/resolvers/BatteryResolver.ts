import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Context } from '../Context';
// import { Battery as BatteryModel } from '../models/Battery';
// import { User as UserModel } from '../models/User';
import { BatteryService } from '../services/BatteryService';
import { Battery } from '../types/Battery';

@Service()
@Resolver(of => Battery)
export class BatteryResolver {

    constructor(
        private batteryService: BatteryService
        ) {

        }

    @Authorized()
    @Query(returns => [Battery])
    public batteries(
        @Ctx() ctx: Context
    ): Promise<any> {
      return this.batteryService.find();
    }

}
