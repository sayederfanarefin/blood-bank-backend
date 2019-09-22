import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';
import { MLRequest } from '../models/dto/dashboard/MLRequest';
import { MLRespond } from '../models/dto/dashboard/MLRespond';
import { RawNewCarPricesInput } from '../models/dto/upload/RawNewCarPricesInput';
import { RawOldCarPricesInput } from '../models/dto/upload/RawOldCarPricesInput';
import { MLFactors } from '../models/MLFactors';
import { Vehicle } from '../models/Vehicle';
import { VehicleNewCarPricing } from '../models/VehicleNewCarPricing';
import { VehiclePricing } from '../models/VehiclePricing';
import { MLFactorsRepository } from '../repositories/MLFactorsRepository';
import { VehicleNewCarPricingRepository } from '../repositories/VehicleNewCarPricingRepository';
import { VehiclePricingRepository } from '../repositories/VehiclePricingRepository';
import { VehicleRepository } from '../repositories/VehicleRepository';

import uuid = require('uuid');
@Service()
export class MachineLearningService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private vehicleRepository: VehicleRepository,
        @OrmRepository() private vehicleNewCarPricingRepository: VehicleNewCarPricingRepository,
        @OrmRepository() private vehiclePricingRepository: VehiclePricingRepository,
        @OrmRepository() private mLFactorsRepository: MLFactorsRepository
    ) {

    }

    public async saveNewCarPrices( rawNewCarPricesInput: RawNewCarPricesInput): Promise< void > {
        const prices = rawNewCarPricesInput.Prices;
        for (const price of prices) {
            const vehicleNewCarPricing = new VehicleNewCarPricing();
            vehicleNewCarPricing.battery = price.Battery;
            vehicleNewCarPricing.date = new Date(price.Date);
            vehicleNewCarPricing.powerTrain = price.Powertrain;
            vehicleNewCarPricing.price = price.Price;

            this.vehicleRepository.findOne({
                where: {
                    model: price.Model,
                    year: price.Year,
                    name: 'Tesla',
                },
            })
            .then( ( vehicle: Vehicle) => {
                vehicleNewCarPricing.vehicle = vehicle;
                return vehicleNewCarPricing;
            })
            .then( ( vehicleNewCarPricing2: VehicleNewCarPricing) => {
                vehicleNewCarPricing.id = uuid.v4();
                return this.vehicleNewCarPricingRepository.save(vehicleNewCarPricing2);
            })
            .then( () => {
                this.calculateK1Factor();
            })
            .catch ( ( error ) => {
                this.log.error('error in saving new price: ' + error);
            });
        }
    }

    public async saveOldCarPrices( rawOldCarPricesInput: RawOldCarPricesInput): Promise< void > {

        for (const price of rawOldCarPricesInput.Prices) {
            const vehicleOldCarPricing = new VehiclePricing();
            vehicleOldCarPricing.battery = price.Battery;
            vehicleOldCarPricing.date = new Date(price.Date);
            vehicleOldCarPricing.powerTrain = price.Powertrain;
            vehicleOldCarPricing.price = price.Price;
            vehicleOldCarPricing.miles = price.Miles;

            this.vehicleRepository.findOne({
                where: {
                    model: price.Model,
                    year: price.Year,
                    name: 'Tesla',
                },
            })
            .then( ( vehicle: Vehicle) => {
                vehicleOldCarPricing.vehicle = vehicle;
                return vehicleOldCarPricing;
            })
            .then( ( vehicleOldCarPricing2: VehiclePricing) => {
                vehicleOldCarPricing2.id = uuid.v4();
                return this.vehiclePricingRepository.save(vehicleOldCarPricing2);
            })
            .then( () => {
                this.calculateK2Factor();
            })
            .catch ( ( error ) => {
                this.log.error('error in saving new price: ' + error);
            });
        }
    }

    public async getPredictedPrice(mlRequest: MLRequest): Promise<number> {
        return this.callMLStudio(mlRequest)
        .then( ( mLRespond: MLRespond) => {
            return Number(mLRespond.Price);
        })
        .then( async ( predictedPrice: number) => {
            return await this.getK1Factor( 'Tesla', mlRequest.model, Number(mlRequest.year)) * predictedPrice;
        })
        .then( async ( predictedPriceWithK1Factor: number) => {
            return await this.getK2Factor() * predictedPriceWithK1Factor;
        })
        .catch( ( error ) => {
            this.log.error(' found error here on get Predicted Price: ' + error);
            return undefined;
        });
    }
    private async callMLStudio( mlRequest: MLRequest): Promise<MLRespond> {
        const config: AxiosRequestConfig = {
            url: env.azureMachineLearningStudio.url,
            method: 'POST',
            baseURL: env.schedulerModule.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + env.azureMachineLearningStudio.apiKey,
            },
            data: {
                Model: mlRequest.model,
                Year: mlRequest.year,
                Battery: mlRequest.battery,
                Price: '0',
                Date: mlRequest.date,
            },
        };

        return await axios(config)
            .then( async (response: AxiosResponse) => {
                if (response.status !== 200) {
                   return undefined;
                } else {
                    const mLRespond: MLRespond = response.data as MLRespond;
                    return mLRespond;
                }
            })
            .catch((error: AxiosError) => {
                this.log.error( '====> ml studio error: ' + error );
                return undefined;
             });
    }

    private async getK1Factor( make: string, model: string, year: number): Promise<number> {
        return await this.mLFactorsRepository.find({
            order: { date: 'DESC' },
            where: {
                vehicle: {
                    make,
                    model,
                    year,
                },
            },
        })
        .then( ( mlfacto: MLFactors[]) => {
            return mlfacto[0].k1;
        })
        .catch( ( error ) => {
            this.log.error(' error in getting k1: ' + error);
            return undefined;
        });
    }

    private async getK2Factor(): Promise<number> {
        return 0;
    }
    private async calculateK1Factor(): Promise<any> {
        this.log.info ( ' ============================>>>>>>>>>>>>>>>>>> K1 factor: ' );
        return this.vehicleRepository.find()
        .then( ( vehicles: Vehicle[] ) => {
            for ( const vehicle of vehicles ) {
                this.log.info('=============>>> vehicle: ' + vehicle.model + ' ' + vehicle.year);
                this.vehicleNewCarPricingRepository.find({
                    where: {
                        model: vehicle.model,
                        make: 'Tesla',
                        year: vehicle.year,
                    },
                })
                .then( ( vehicleNewCarPricings: VehicleNewCarPricing[] ) => {
                    for ( const vehicleNewCarPricing of vehicleNewCarPricings ) {
                        // vehicleNewCarPricing.price;
                        this.log.info('==============>> ' + vehicleNewCarPricing.price);
                    }
                })
                .catch( ( error ) => {
                    this.log.error(' error in k1: ' + error);
                });
            }
        })
        .catch( ( error ) => {
            this.log.error(' error in k1: ' + error);
            return undefined;
        });
    }

    private calculateK2Factor(): Promise<any> {
        this.log.info ( ' ============================>>>>>>>>>>>>>>>>>> K2 factor: ' );
        return this.vehicleRepository.find()
        .then( ( vehicles: Vehicle[] ) => {
            for ( const vehicle of vehicles ) {
                this.log.info('=============>>> vehicle: ' + vehicle.model + ' ' + vehicle.year);
                this.vehicleNewCarPricingRepository.find({
                    where: {
                        model: vehicle.model,
                        make: 'Tesla',
                        year: vehicle.year,
                    },
                })
                .then( ( vehicleNewCarPricings: VehicleNewCarPricing[] ) => {
                    for ( const vehicleNewCarPricing of vehicleNewCarPricings ) {
                        // vehicleNewCarPricing.price;
                        this.log.info('==============>> ' + vehicleNewCarPricing.price);
                    }
                })
                .catch( ( error ) => {
                    this.log.error(' error in k1: ' + error);
                });
            }
        })
        .catch( ( error ) => {
            this.log.error(' error in k1: ' + error);
            return undefined;
        });
    }
}
