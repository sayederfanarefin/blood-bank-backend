import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Context } from '../Context';
import { Vehicle as VehicleModel } from '../models/Vehicle';
// import { User as UserModel } from '../models/User';
import { VehicleService } from '../services/VehicleService';
import { VehicleInput } from '../types/input/VehicleInput';
import { Vehicle } from '../types/Vehicle';

@Service()
@Resolver(of => Vehicle)
export class VehicleResolver {

    constructor(
        private vehicleService: VehicleService
        ) {

        }
    @Authorized()
    @Query(returns => [Vehicle])
    public vehicles(
        @Ctx() ctx: Context
    ): Promise<any> {
        // ctx.response.sendStatus(401).send('Erfan ');
      return this.vehicleService.find();
    }

    @Authorized()
    @Mutation(() => Vehicle, { nullable: true })
    public async createVehicle(
      @Arg('vehicle') vehicle: VehicleInput
    ): Promise<any> {

        const vehicleModel = new VehicleModel();
        vehicleModel.name = vehicle.name;
        vehicleModel.model = vehicle.model;
        vehicleModel.year = vehicle.year;

        return undefined ; // this.vehicleService.create( vehicleModel );
    }

}
