import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Context } from '../Context';
import { UserVehicle as UserVehicleModel } from '../models/UserVehicle';
// import { UserService } from '../services/UserService';
// import { User as UserModel } from '../models/User';
// import { UserVehicleService } from '../services/UserVehicleService';
import { VehicleService } from '../services/VehicleService';
import { UserVehicleInput } from '../types/input/UserVehicleInput';
import { UserVehicle } from '../types/UserVehicle';

@Service()
@Resolver(of => UserVehicle)
export class UserVehicleResolver {

    constructor(
       // private userVehicleService: UserVehicleService,
        private vehicleService: VehicleService
        // private userService: UserService
        ) {

        }
    // @Authorized()
    // @Query(returns => [UserVehicle])
    // public userVehicles(
    //     @Ctx() ctx: Context
    // ): Promise<any> {

    //     // ctx.response.sendStatus(401).send('Erfan ');
    //   return this.userVehicleService.find();
    // }

    @Authorized()
    @Mutation(() => UserVehicle, { nullable: true })
    public async createUserVehicle(
      @Arg('userVehicle') userVehicle: UserVehicleInput,
      @Ctx() ctx: Context
    ): Promise<any> {

        const userVehicleModel = new UserVehicleModel();
        userVehicleModel.name = userVehicle.name;
        userVehicleModel.teslaPassword = userVehicle.teslaPassword;
        userVehicleModel.teslaUsername = userVehicle.teslaUsername;
        userVehicleModel.vin = userVehicle.vin;
        await this.vehicleService.findOne(userVehicle.vehicleInput.id).then ( ( vehicle ) => {
            userVehicleModel.vehicle = vehicle ;

        }).catch ( () => {
            userVehicleModel.vehicle = undefined;
        });
        // await this.userService.findOne( ctx.userId ).then( ( user ) => {
        //     userVehicleModel.user = user;
        // }).catch ( () => {
        //     userVehicleModel.user = undefined;
        // });
        return undefined ; // this.userVehicleService.register( ctx.request.user userVehicleModel );
    }

    // @FieldResolver
    // public async vehicle ( @Root userVehicle: UserVehicleInput): Promise < any > {
    //     await this.vehicleService.findOne(userVehicle.vehicleInput.id).then ( ( vehicle ) => {
    //             return vehicle;
    //         });
    // }

}
