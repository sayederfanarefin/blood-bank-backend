import { Authorized, Get, JsonController, OnUndefined, Param, Req } from 'routing-controllers';

import { UserNotFoundError } from '../errors/UserNotFoundError';
// import { UserInput } from '../models/dto/UserInputDTO';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Authorized()
@JsonController('/users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get('/me')
    public findMe(@Req() req: any): Promise<User> {
        return req.user;
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    public one(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

}
