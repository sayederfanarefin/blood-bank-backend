import { EntityRepository, Repository } from 'typeorm';

import { ClimateState } from '../../models/telematics/ClimateState';

@EntityRepository(ClimateState)
export class ClimateStateRepository extends Repository<ClimateState>  {

}
