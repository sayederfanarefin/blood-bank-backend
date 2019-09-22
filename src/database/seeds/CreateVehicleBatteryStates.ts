import * as fs from 'fs';
import * as path from 'path';
import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Battery } from '../../../src/api/models/Battery';
import { Vehicle } from '../../../src/api/models/Vehicle';

import uuid = require('uuid');
interface MyVehicleBattery {
    model: string;
    typical_range_after_correction_if_range_mode_was_off: number;
    typical_range_of_this_model_when_new: number;
    km: number;
}

export class CreateVehicleBatteryStates implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {

        const em = connection.createEntityManager();
        const data = fs.readFileSync(path.join(__dirname, '../storageforseeding/scatterplotstuff.json'), 'utf8' );
        const pure = data.replace(/^\s+|\s+$/g, '');
        const vehicleRepository = em.getRepository(Vehicle);
        try {
            const objs = JSON.parse( pure ) as MyVehicleBattery[];
            for (const batteryJson of objs) {
                console.log(batteryJson);
                const batteryModel = new Battery();
                batteryModel.id = uuid.v4();
                batteryModel.km = batteryJson.km;
                batteryModel.typicalRangeAfter = batteryJson.typical_range_after_correction_if_range_mode_was_off;
                batteryModel.typicalRangeOfNew = batteryJson.typical_range_of_this_model_when_new;
                batteryModel.originalRange = ( batteryModel.typicalRangeAfter / batteryModel.typicalRangeOfNew ) * 100;
                console.log( batteryModel.toString() );

                const vehicle = await vehicleRepository.findOne({
                    where: {
                        model: batteryJson.model,
                        name: 'Tesla',
                     }});
                     batteryModel.vehicle = vehicle;
                await em.save(batteryModel);
                // const newVehicle = vehicle.id, vehicle.batteries.push(batteryModel);
                // await vehicleRepository.update();
            }

          } catch ( err ) {
            console.error(err);
          }

        // const batteryModel2 = new Battery();
        // batteryModel2.km =  10000;
        // return batteryModel2;
    }
}
