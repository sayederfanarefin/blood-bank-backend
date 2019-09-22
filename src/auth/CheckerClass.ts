import { User } from 'src/api/models/User';
import { Container } from 'typedi';

import { UserService } from '../api/services/UserService';

// import { LoggerInterface } from '../decorators/Logger';

export class CheckerClass {

    private readonly userService = Container.get(UserService);

    public async check( token: string): Promise <boolean> {
        const result = await this.userService.tokenExists(token);
        if ( result ) {
            return true;
        } else {
            return false;
        }
    }

    public async getUserId( token: string): Promise <string> {
        const user = await this.userService.getUserWithToken(token);
        return user.id;
    }

    public async getUser( token: string): Promise < User > {
        return await this.userService.getUserWithToken(token);
    }

}
