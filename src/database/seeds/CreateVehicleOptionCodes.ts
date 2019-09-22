import * as fs from 'fs';
import * as path from 'path';
import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { OptionCode } from '../../api/models/OptionCode';

import uuid = require('uuid');

let optionCodeRepository ;
export class CreateVehicleOptionCodes implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {

        const em = connection.createEntityManager();
        optionCodeRepository = em.getRepository(OptionCode);
        this.optionsCodeOperation('../storageforseeding/main/optionCodes/modelS/', 'models');
        this.optionsCodeOperation('../storageforseeding/main/optionCodes/modelX/', 'modelx');

        }

    private async optionsCodeOperation( dir: string, model: string ): Promise <void> {
        try {
            const data = fs.readdirSync( path.join(__dirname, dir) );
            const files: string[] = data as string[];
            for (const file of files) {
                const filePath = path.join(__dirname, dir) + file;
                console.log('=====> ' + file);
                console.log('=====> ' + filePath);
                const dataJson = fs.readFileSync(filePath, 'utf8' );

                const pureDataJson = dataJson.replace(/^\s+|\s+$/g, '');
                const optionCodeDetails: string[] = pureDataJson.split(',', 1000000);
                for ( const optionCodeDetail of optionCodeDetails ) {
                    const pureOptionCodeDetail: string = optionCodeDetail.replace(/['"]+/g, '');
                    const bothPartsOfOptionCode: string[] = pureOptionCodeDetail.split(':', 2);
                    const optionCode = new OptionCode();
                    optionCode.id = uuid.v4();
                    optionCode.vehicleModel = model;
                    await this.pureIt(bothPartsOfOptionCode[0])
                    .then( ( result: string ) => { optionCode.optionCode = result; });
                    optionCode.optionCodeFull = bothPartsOfOptionCode[1];
                    console.log(optionCode);
                    await optionCodeRepository.save(optionCode);
                }
            }
          } catch ( err ) {
                console.error(err);
          }
    }
    private async pureIt( impure: string): Promise < string > {
        const content1 = impure.replace(/\r\n/g, '');
        const content2 = content1.replace(/\n\r/g, '');
        const content3 = content2.replace(/\n/g, '');
        const content4 = content3.replace(/\r/g, '');
        const content5 = content4.replace('    ', '');
        const content6 = content5.replace('{', '');
        return content6;
    }
}
