import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { DatabaseReplyForVehiclePricing } from '../models/dto/DatabaseReplyForVehiclePricing';
import { HistogramDTO } from '../models/dto/HistogramDTO';
import { VehiclePricing } from '../models/VehiclePricing';
import { VehiclePricingStats } from '../models/VehiclePricingStats';
import { VehiclePricingRepository } from '../repositories/VehiclePricingRepository';
import { VehiclePricingStatsRepository } from '../repositories/VehiclePricingStatsRepository';
import { VehicleRepository } from '../repositories/VehicleRepository';

import uuid = require('uuid');

@Service()
export class VehiclePricingService {

    constructor(
        @OrmRepository() private vehiclePricingRepository: VehiclePricingRepository,
        @OrmRepository() private vehicleRepository: VehicleRepository,
        @OrmRepository() private vehiclePricingStatsRepository: VehiclePricingStatsRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {

    }
    public find(): Promise<VehiclePricing[]> {
        this.log.info('Find all VehiclePricing');
        return this.vehiclePricingRepository.find();
    }

    public findOne(id: string): Promise<VehiclePricing> {
        this.log.info('Find one VehiclePricing ' + id);
        const result = this.vehiclePricingRepository.findOne({ id });
        this.log.info (' got result: ' + result);
        return result;
    }

    public async create(vehiclePricing: VehiclePricing): Promise<VehiclePricing> {
        this.log.info('Create a new VehiclePricing => ', VehiclePricing.toString());
        vehiclePricing.id = uuid.v4();
        const newUser = await this.vehiclePricingRepository.save(vehiclePricing);
        // this.eventDispatcher.dispatch(events.user.created, newUser);
        return newUser;
    }

    public update(id: string, vehiclePricing: VehiclePricing): Promise<VehiclePricing> {
        this.log.info('Update a Vehicle');
        vehiclePricing.id = id;
        return this.vehiclePricingRepository.save(vehiclePricing);
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a Vehicle');
        await this.vehiclePricingRepository.delete(id);
        return;
    }

    public async histogram(): Promise< HistogramDTO[] > {
        return await this.vehiclePricingStatsRepository.find()
             .catch( ( error ) => {
                 this.log.info ('error while in histogram service method: ' + error);
                 return undefined;
             })
             .then( ( battery ) => battery.map((dto: HistogramDTO) => {
                return this.toBatteryDTO(dto);
            }));

            //  .then( ( vehiclePricingStat ) => vehiclePricingStat.map((dto: HistogramDTO) => {
            //     return this.toHistogramDTO(vehiclePricingStat);
            // }));
            //  .then( ( vehiclePricingStats: VehiclePricingStats[]) => {
            //      this.log.info('===man: ' + vehiclePricingStats.toString());
            //     return undefined;
            //  });
    }
    public async histogramMakeModelYearBattery(year: string, model: string, make: string, battery: string): Promise< HistogramDTO[] > {
        return await this.vehiclePricingStatsRepository.find({
            where: {
                make,
                model,
                year,
                battery,
             }})
             .catch( ( error ) => {
                 this.log.info ('error while in histogram service method: ' + error);
                 return undefined;
             })
             .then( ( vehiclePricingStats ) => vehiclePricingStats.map((dto: HistogramDTO) => {
                return this.toBatteryDTO(dto);
            }));
            //  .then( ( vehiclePricingStats: VehiclePricingStats[]) => {
            //     return vehiclePricingStats;
            //  });
    }
    public async histogramMakeModelYear(year: string, model: string, make: string): Promise< VehiclePricingStats[] > {
        return await this.vehiclePricingStatsRepository.find({
            where: {
                make,
                model,
                year,
             }})
             .catch( ( error ) => {
                 this.log.info ('error while in histogram service method: ' + error);
                 return undefined;
             })
             .then( ( vehiclePricingStats: VehiclePricingStats[]) => {
                return vehiclePricingStats;
             });
    }
    public async histogramMakeModel( model: string, make: string): Promise< VehiclePricingStats[] > {
        return await this.vehiclePricingStatsRepository.find({
            where: {
                make,
                model,
             }})
             .catch( ( error ) => {
                 this.log.info ('error while in histogram service method: ' + error);
                 return undefined;
             })
             .then( ( vehiclePricingStats: VehiclePricingStats[]) => {
                return vehiclePricingStats;
             });
    }
    public async histogramMake(make: string): Promise< VehiclePricingStats[] > {
        return await this.vehiclePricingStatsRepository.find({
            where: {
                make,
             }})
             .catch( ( error ) => {
                 this.log.info ('error while in histogram service method: ' + error);
                 return undefined;
             })
             .then( ( vehiclePricingStats: VehiclePricingStats[]) => {
                return vehiclePricingStats;
             });
    }

    public async measuresForHistogram(): Promise < any > {

        this.histogram()
        .then( async ( histogramArray: HistogramDTO[]) => {
            if ( histogramArray.length !== 0 ) {
                const pricingLimits: number[] = [];
                let x = 0;
                while (x < 100000) {
                    pricingLimits.push(x);
                    x = x + 10000;
                }
                const batteries: string[] = [];
                const models: string[] = [];
                // const makes: string[] = [];
                const years: string[] = [];
                this.log.info ( '===i am xxxx1');
                 await this.vehiclePricingRepository.query('SELECT DISTINCT "battery" FROM "vehicle_pricing"')
                 .then ( async ( distinctBatteries: any[] ) => {
                    this.log.info ( '===i am xxxx2');
                    for (const batteryEcntry of distinctBatteries) {
                        batteries.push(batteryEcntry.battery);
                    }
                 })
                 .then( async () => {
                    this.log.info ( '===i am xxxx3');
                    return await this.vehicleRepository.query('SELECT DISTINCT "model" FROM "vehicle"');
                 })
                 .then ( ( distinctModels: any[] ) => {
                    this.log.info ( '===i am xxxx4');
                    for (const modelEcntry of distinctModels) {
                        models.push(modelEcntry.model);
                    }
                 })
                //  .then( async () => {
                //     this.log.info ( '===i am xxxx5');
                //     return await this.vehicleRepository.query('SELECT DISTINCT "name" FROM "vehicle"');
                //  })
                //  .then ( ( distinctMakes: any[] ) => {
                //     this.log.info ( '===i am xxxx6');
                //     for (const makeEntry of distinctMakes) {
                //         makes.push(makeEntry.make);
                //     }
                //  })
                 .then( async () => {
                    this.log.info ( '===i am xxxx7');
                    return await this.vehicleRepository.query('SELECT DISTINCT "year" FROM "vehicle"');
                 })
                 .then ( ( distinctYears: any[] ) => {
                    this.log.info ( '===i am xxxx8');
                    for (const yearEntry of distinctYears) {
                        years.push(yearEntry.year);
                    }
                 })
                 .finally( async () => {

                    this.log.info ( '=== all years:');
                    for (const year of years) {

                        this.log.info (year);
                    }
                    this.log.info ( '=== all batteries:');
                    for (const battery of batteries) {

                        this.log.info (battery);
                    }
                    this.log.info ( '=== all models:');
                    for (const model of models) {

                        this.log.info (model);
                    }
                    // this.log.info ( '=== all makes:');
                    // for (const make of makes) {
                    //     count = count + 1;
                    //     this.log.info (make);
                    // }

                    for (const year of years) {
                        for (const battery of batteries) {
                            for (const model of models) {
                                let i = 0;
                                while ( i < pricingLimits.length - 1 ) {
                                    const lowerLimit = pricingLimits[i];
                                    const upperLimit = pricingLimits[ i + 1 ];

                                    const query: string = 'SELECT * FROM "vehicle_pricing" ' +
                                    'INNER JOIN "vehicle" ON "vehicle_pricing"."vehicle_id" = "vehicle"."id" WHERE "year" = ' + year +
                                    ' AND "model" = \'' + model + '\' AND "vehicle_pricing"."battery" = \'' +
                                    battery + '\' AND "vehicle_pricing"."price" > ' + lowerLimit + ' AND "vehicle_pricing"."price" < ' + upperLimit ;

                                    // this.log.info ( 'query => ' + query);
                                    await this.vehiclePricingRepository.query( query )
                                    .catch( ( error ) => {
                                        this.log.info('=========> Error: ' + error);
                                    })
                                    .then ( async ( vehiclePricings: DatabaseReplyForVehiclePricing[]) => {
                                        const count = vehiclePricings.length;
                                        for (const vehiclePricing of vehiclePricings) {
                                            const vehicePricingStats = new VehiclePricingStats();
                                            vehicePricingStats.id = uuid.v4();
                                            vehicePricingStats.model = vehiclePricing.model;
                                            vehicePricingStats.year = vehiclePricing.year;
                                            vehicePricingStats.battery = vehiclePricing.battery;
                                            vehicePricingStats.make = 'Tesla';
                                            vehicePricingStats.count = count;
                                            vehicePricingStats.priceLower = lowerLimit;
                                            vehicePricingStats.priceUpper = upperLimit;
                                            vehicePricingStats.date = vehiclePricing.date;
                                            this.log.info( '==============>>>>>>>> got something: ' + vehicePricingStats.toString());
                                            await this.vehiclePricingStatsRepository.findOne({ where: {
                                                make: vehicePricingStats.make,
                                                model: vehicePricingStats.model,
                                                battery: vehicePricingStats.battery,
                                                year: vehicePricingStats.year,
                                                date: vehicePricingStats.date,
                                                priceLower: vehicePricingStats.priceLower,
                                                priceUpper: vehicePricingStats.priceUpper,
                                                count: vehicePricingStats.count,
                                            }}).then ( async (vehiclePricingStats: VehiclePricingStats ) => {
                                                if ( vehiclePricingStats === undefined) {
                                                    await this.vehiclePricingStatsRepository.save(vehicePricingStats);
                                                }
                                            });
                                        }
                                    });
                                    i++;
                                 }
                            }
                        }
                    }

                 })
                 .catch ( ( error ) => {
                     this.log.info ('Caught an error: ' + error);
                 }) ;
            }
        })
        .catch ( ( error ) => {
            this.log.info ('Caught an error: ' + error);
        }) ;

        return undefined;
    }

    // private toHistogramDTO( vehiclePricingStats: VehiclePricingStats): HistogramDTO {
    //    const histogramDTO: HistogramDTO = {
    //         priceUpper: vehiclePricingStats.priceUpper,
    //         priceLower: vehiclePricingStats.priceLower,
    //         count: vehiclePricingStats.count,
    //    };
    //    return histogramDTO;
    // }
    private toBatteryDTO(batteryDTO: HistogramDTO): VehiclePricingStats {
        const battery = new VehiclePricingStats();
        battery.priceUpper = batteryDTO.priceUpper;
        battery.priceLower = batteryDTO.priceLower;
        battery.count = batteryDTO.count;
        return battery;
    }
}
