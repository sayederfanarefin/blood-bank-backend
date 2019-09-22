import { EntityRepository, Repository } from 'typeorm';

import { VehicleData } from '../../models/telematics/VehicleData';

@EntityRepository(VehicleData)
export class VehicleDataRepository extends Repository<VehicleData>  {

}
