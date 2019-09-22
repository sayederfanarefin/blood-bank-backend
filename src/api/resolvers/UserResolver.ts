import { Authorized, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    @Authorized()
    @Query(returns => [User])
    public users(): Promise<any> {
      return undefined; // this.userService.find();
    }

}
