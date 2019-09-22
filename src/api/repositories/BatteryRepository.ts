import { EntityRepository, Repository } from 'typeorm';

import { Battery } from '../models/Battery';

@EntityRepository(Battery)
export class BatteryRepository extends Repository<Battery>  {

}
