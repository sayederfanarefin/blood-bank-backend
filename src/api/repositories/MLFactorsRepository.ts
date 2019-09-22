import { EntityRepository, Repository } from 'typeorm';

import { MLFactors } from '../models/MLFactors';

@EntityRepository(MLFactors)
export class MLFactorsRepository extends Repository<MLFactors>  {

}
