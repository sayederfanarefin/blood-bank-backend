import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';
// import { UserDTO } from '../models/dto/teslaApi/UserDTO';
// import { VehicleDataReply } from '../models/dto/telematics/telematics/VehicleData';
import { VehicleData } from '../models/telematics/VehicleData';

@Service()
export class SchedularModuleService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) { }

    public async schedule( userId: string, teslaUserName: string, teslaPassword: string, vin: string ): Promise< VehicleData > {

        this.log.info('pushing to schedular: ' + userId);
        // let flag = undefined;
        const config: AxiosRequestConfig = {
            url: env.schedulerModule.createUserEndpoint,
            method: 'POST',
            baseURL: env.schedulerModule.baseUrl,
            headers: {
                'Content-Type': 'application/json',
               // 'Authorization': 'bearer ' + env.mainBackend.accessToken,
            },
            data: {
                xyz: userId,
                username: teslaUserName,
                password: teslaPassword,
                vin,
            },
        };

        return await axios(config)
            .then( async (response: AxiosResponse) => {
                if (response.status !== 200) {
                   return undefined;
                } else {
                    const vehicle: VehicleData = response.data as VehicleData;
                    return vehicle;
                }
            })
            .catch((error: AxiosError) => {
                this.log.error( '====> pushing to schedular error: ' + error );
                return undefined;
             });
    }
}
