import { Body, JsonController, Post } from 'routing-controllers';

import { RawNewCarPricesInput } from '../models/dto/upload/RawNewCarPricesInput';
import { RawOldCarPricesInput } from '../models/dto/upload/RawOldCarPricesInput';
import { MachineLearningService } from '../services/MachineLearningService';

@JsonController('/teslaPriceDataset')
export class TeslaPriceDatasetController {

    constructor(
        private machineLearningService: MachineLearningService
    ) {

    }

    // @Authorized()
    // @ContentType("text/cvs")
    @Post('/secondHand')
    public async secondHand( @Body() rawOldCarPricesInput: RawOldCarPricesInput): Promise< any > {
        return this.machineLearningService.saveOldCarPrices(rawOldCarPricesInput)
        .then( () => {
            return {
                message: 'Old car prices saved!',
            };
        });
    }

    @Post('/newCarPrices')
    public async newCarPrices( @Body() rawNewCarPricesInput: RawNewCarPricesInput): Promise< any > {
        return this.machineLearningService.saveNewCarPrices(rawNewCarPricesInput)
        .then( () => {
            return {
                message: 'new car prices saved!',
            };
        });
    }
}
