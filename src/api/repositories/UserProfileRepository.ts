import { EntityRepository, Repository } from 'typeorm';

import { UserProfile } from '../models/UserProfile';

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile>  {

}
