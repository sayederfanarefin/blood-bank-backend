import * as fs from 'fs';
import * as path from 'path';
import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

// import { Battery } from '../../api/models/Battery';
import { Vehicle } from '../../api/models/Vehicle';
import { VehiclePricing } from '../../api/models/VehiclePricing';

import uuid = require('uuid');
interface MyPricing {
    date: string;
    Model: string;
    Year: number;
    Battery: string;
    Powertrain: string;
    Price: string;
    miles: string;
    source: string;
}

export class CreateVehiclePricing implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {

        const em = connection.createEntityManager();
        const data = fs.readFileSync(path.join(__dirname, '../storageforseeding/price.json'), 'utf8' );
        const pure = data.replace(/^\s+|\s+$/g, '');
        const vehicleRepository = em.getRepository(Vehicle);
        try {
            const objs = JSON.parse( pure ) as MyPricing[];
            for (const pricingJson of objs) {
                console.log(pricingJson);
                const vehiclePricing = new VehiclePricing();
                vehiclePricing.id = uuid.v4();
                vehiclePricing.date = new Date(pricingJson.date);
                vehiclePricing.miles = parseInt (pricingJson.miles.replace(/,/g, ''), 10);
                vehiclePricing.powerTrain = pricingJson.Powertrain;
                vehiclePricing.price = parseInt(pricingJson.Price.replace(/,/g, '').replace('$', ''), 10);
                vehiclePricing.battery = pricingJson.Battery;

                console.log( vehiclePricing.toString() );

                const vehicle = await vehicleRepository.findOne({
                    where: {
                        model: pricingJson.Model,
                        year: pricingJson.Year,
                        name: 'Tesla',
                     }});

                     if ( vehicle === undefined) {
                         // create vehicle with this model
                         const veh = new Vehicle();
                         veh.id = uuid.v4();
                         veh.model = pricingJson.Model;
                         veh.year = pricingJson.Year;
                         veh.name = 'Tesla',
                         await vehicleRepository.save(veh);
                         vehiclePricing.vehicle = veh;
                     } else {
                        vehiclePricing.vehicle = vehicle;
                     }
                await em.save(vehiclePricing);
            }

          } catch ( err ) {
            console.error(err);
          }
    }
}
