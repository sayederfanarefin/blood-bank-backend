import { EntityRepository, Repository } from 'typeorm';

import { VehicleState } from '../../models/telematics/VehicleState';

@EntityRepository(VehicleState)
export class VehicleStateRepository extends Repository<VehicleState>  {

}
