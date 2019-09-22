import { EntityRepository, Repository } from 'typeorm';

import { OptionCode } from '../models/OptionCode';

@EntityRepository(OptionCode)
export class OptionCodeRepository extends Repository<OptionCode>  {

}
