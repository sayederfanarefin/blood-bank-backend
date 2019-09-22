import { EntityRepository, Repository } from 'typeorm';

import { SpeedLimitMode } from '../../models/telematics/SpeedLimitMode';

@EntityRepository(SpeedLimitMode)
export class SpeedLimitModeRepository extends Repository<SpeedLimitMode>  {

}
