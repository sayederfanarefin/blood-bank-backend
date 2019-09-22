import { EntityRepository, Repository } from 'typeorm';

import { DriveState } from '../../models/telematics/DriveState';

@EntityRepository(DriveState)
export class DriveStateRepository extends Repository<DriveState>  {

}
