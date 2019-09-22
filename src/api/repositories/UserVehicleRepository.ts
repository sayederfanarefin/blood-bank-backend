import { EntityRepository, Repository } from 'typeorm';

import { UserVehicle } from '../models/UserVehicle';

@EntityRepository(UserVehicle)
export class UserVehicleRepository extends Repository<UserVehicle>  {

}
