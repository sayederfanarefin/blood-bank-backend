import {
    Authorized, Body, Delete, HttpCode, JsonController, OnUndefined, Param, Post, Req
} from 'routing-controllers';

import { VehicleBadRequestError } from '../errors/VehiccleBadRequestError';
import { VehicleInput } from '../models/dto/asif/VehicleInputDTO';
// import { BatteryService } from '../services/BatteryService';
import { UserVehicleService } from '../services/UserVehicleService';

@Authorized()
@JsonController('/vehicle')
export class UserVehicleController {
    constructor(
        private userVehicleService: UserVehicleService

    ) { }

    @Post('/register')
    @HttpCode(201)
    @OnUndefined(VehicleBadRequestError)
    public async registerVehicle(@Req() req: any, @Body() vehicleInput: VehicleInput): Promise<any> {
        return await this.userVehicleService.create( req.user.userId , vehicleInput)
        .then ( ( result: boolean ) => {
            console.log ( 'Register vehicle result: ' + result);
            if (result) {
                return {
                    message: 'Vehicle registered!',
                };
             } else {
                return undefined;
             }
         });
    }

    // update
    @Post('/update/:id')
    @OnUndefined(VehicleBadRequestError)
    public async updateVehicle( @Req() req: any, @Body()  vehicleInput: VehicleInput, @Param('id') id: string): Promise<any> {
        return await this.userVehicleService.update( req.user.userId , vehicleInput, id)
        .then ( ( result: boolean ) => {
            console.log ( 'updated vehicle result: ' + result);
            if (result) {
                return {
                    message: 'Vehicle updated!',
                };
             } else {
                return undefined;
             }
         });
    }

    @Delete('/delete/:id')
    @HttpCode(204)
    @OnUndefined(VehicleBadRequestError)
    public async deleteVehicle( @Param('id') id: string): Promise< any > {
        return await this.userVehicleService.delete( id );
    }
}
