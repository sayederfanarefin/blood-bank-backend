import * as fs from 'fs';
import * as path from 'path';
import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Vehicle } from '../../../src/api/models/Vehicle';

import uuid = require('uuid');
interface MyVehicle {
    name: string;
    year: number;
    model: string;
}

export class CreateVehicles implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {

        const em = connection.createEntityManager();
        const data = fs.readFileSync(path.join(__dirname, '../storageforseeding/vehiclemodels.json'), 'utf8' );
        const pure = data.replace(/^\s+|\s+$/g, '');
        try {
            const objs = JSON.parse( pure ) as MyVehicle[];
            for (const vehicleJson of objs) {
                const vehicleModel = new Vehicle();
                vehicleModel.id = uuid.v4();
                vehicleModel.name = vehicleJson.name;
                vehicleModel.year = vehicleJson.year;
                vehicleModel.model = vehicleJson.model;
                console.log( vehicleModel.toString() );
                await em.save(vehicleModel);
            }

          } catch ( err ) {
            console.error(err);
          }

        // const vehicle = new Vehicle();
        // vehicle.name =  'xyz';
        // return vehicle; // await em.save(vehicle);
    }
}
