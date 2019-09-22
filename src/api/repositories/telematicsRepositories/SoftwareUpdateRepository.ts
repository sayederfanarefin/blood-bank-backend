import { EntityRepository, Repository } from 'typeorm';

import { SoftwareUpdate } from '../../models/telematics/SoftwareUpdate';

@EntityRepository(SoftwareUpdate)
export class SoftwareUpdateRepository extends Repository<SoftwareUpdate>  {

}
