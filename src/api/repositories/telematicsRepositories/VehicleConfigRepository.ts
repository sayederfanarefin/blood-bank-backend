import { EntityRepository, Repository } from 'typeorm';

import { VehicleConfig } from '../../models/telematics/VehicleConfig';

@EntityRepository(VehicleConfig)
export class VehicleConfigRepository extends Repository<VehicleConfig>  {

}
