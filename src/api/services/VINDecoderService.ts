import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { modelIdentifier } from '../models/VINDict/modelIdentifier';
import { worldManufacturerIdentifiers } from '../models/VINDict/worldManufacturerIdentifiers';
import { yearDict } from '../models/VINDict/yearDict';

// import uuid = require('uuid');

@Service()
export class VINDecoderService {

    constructor(
        @Logger(__filename) private log: LoggerInterface
    ) {

    }

    public async getMakeModelYear( vin: string): Promise < any > {
        return this.getManufacturer( vin.substring(0, 3) )
        .then( async ( man: string ) => {
            const year = await this.getYear( vin.charAt(9));
            return { make: man, year };
        })
        .then ( async ( makeYear: any) => {
            const model = await this.getModel(vin.charAt(3));
            const serial = vin.substring(12, 16);
            return { make: makeYear.make, year: makeYear.year , model, serial };
        });
    }

    private async getManufacturer( manCode: string): Promise < string > {
        const man =  worldManufacturerIdentifiers[ manCode ];
        this.log.info('================<<<<<<<<>>>>>>=========== ' + man);
        return man;
    }

    private async getYear( yearCode: string): Promise < string > {
        let defaultYear = 1980;
        const x = yearDict[ yearCode ];
        const currentYear = new Date().getFullYear();
        if ( defaultYear + 30 < currentYear) {
            defaultYear = defaultYear + 30;
        }
        const modelYear = defaultYear + x;
         this.log.info( '==========>>>>>>>>>>>>>>>>>>' + modelYear);
        return modelYear as string;
    }

    private async getModel( modelCode: string): Promise < string > {
        const mod =  modelIdentifier[modelCode];
        this.log.info('================<<<<<<<<>>>>>>=========== ' + mod);
       return mod;
    }

}
