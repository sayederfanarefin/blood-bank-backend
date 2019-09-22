import { EntityRepository, Repository } from 'typeorm';

import { ChargeState } from '../../models/telematics/ChargeState';

@EntityRepository(ChargeState)
export class ChargeStateRepository extends Repository<ChargeState>  {

}
