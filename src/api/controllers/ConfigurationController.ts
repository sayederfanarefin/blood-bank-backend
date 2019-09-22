import {
    Authorized, Body, Get, HttpCode, JsonController, OnUndefined, Param, Post, Req
} from 'routing-controllers';

import { ConfigurationBadRequestError } from '../errors/ConfigurationBadRequestError';
import { UserProfileDTO } from '../models/dto/asif/UserProfileDTO';
import { VehicleDTO } from '../models/dto/asif/VehicleDTO';
import { VehicleOwnerProfileDTO } from '../models/dto/asif/VehicleOwnerProfileDTO';
import { UserInputForUserProfile } from '../models/dto/UserInputForUserProfile';
import { UserProfile } from '../models/UserProfile';
import { TimeZoneService } from '../services/TimeZoneService';
import { UserProfileService } from '../services/UserProfileService';
import { UserService } from '../services/UserService';

@JsonController('/configuration')
export class ConfigurationController {

    constructor(
        private userProfileService: UserProfileService,
        private userService: UserService,
        private timeZoneService: TimeZoneService

    ) {

    }
    @Authorized()
    @Get('/getUserVehicles/:email/:id')
    public getUserVehicles(
        @Param('email') email: string,
        @Param('id') id: string
        ): Promise<VehicleDTO[]> {
        return undefined;
    }
    @Authorized()
    @Get('/getUserProfile')
    public getUserProfile( @Req() req: any ): Promise<VehicleOwnerProfileDTO> {
        return this.userProfileService.findUserProfile( req.user.userId );
    }

    @Post('/createUserProfile')
    @HttpCode(201)
    @OnUndefined(ConfigurationBadRequestError)
    public async createUserProfile( @Body() userProfileDTO: UserInputForUserProfile ): Promise<UserProfile> {
        return await this.userService.registerLikeAsif(userProfileDTO);
    }
    @Authorized()
    @Post('/updateUserProfile/')
    @OnUndefined(ConfigurationBadRequestError)
    public async updateUserProfile( @Req() req: any, @Body() userProfileDTO: UserProfileDTO ): Promise<UserProfileDTO> {
        return await this.userProfileService.update( userProfileDTO, req.user.userId );
    }

    @Get('/getTimeZoneList/')
    public async getTimeZoneList(): Promise<any> {
        return this.timeZoneService.getAllTimeZones();
    }
}
