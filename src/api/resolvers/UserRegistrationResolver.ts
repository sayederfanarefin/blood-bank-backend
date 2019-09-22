import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Context } from '../Context';
// import { UserInput as UserInputDTO } from '../models/dto/UserInputDTO';
import { UserService } from '../services/UserService';
// import { UserInput } from '../types/input/UserInput';
import { User } from '../types/User';

@Service()
@Resolver(of => User)
export class UserResolver {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private userService: UserService
        ) {

        }

    // @Mutation( returns => User)
    // public async register(@Arg('user') user: UserInput): Promise< any > {
    //     const userModel = new UserInputDTO();
    //     userModel.email = user.email;
    //     userModel.firstName = user.firstName;
    //     userModel.lastName = user.lastName;
    //     userModel.password = user.password;
    //     userModel.age = user.age;
    //     userModel.gender = user.gender;
    //     userModel.useOfCar = user.useOfCar;
    //     userModel.profilePictureUrl = user.profilePictureUrl;
    //     return this.userService.register(user);
    // }

    @Mutation(() => User, { nullable: true })
    public async login(
      @Arg('idToken') idToken: string,
      @Ctx() ctx: Context
    ): Promise<any> {
        this.log.info('User login with id token:' + idToken);
        try {
            const user = await this.userService.loginWithIdToken(idToken);
            if ( user === undefined ) {
                this.log.debug('setting header if');
                ctx.response.json({
                    message : 'Forbidden',
                    code: 403 });
            } else {
                this.log.debug('setting header else');
                ctx.response.cookie('authorization', idToken, { maxAge: 900000, httpOnly: true });
                return user;
            }
        } catch (error) {
            this.log.debug('setting header catch');
            ctx.response.json({
                message : 'Forbidden',
                code: 403 });
        }
    }

    @Mutation(() => String, { nullable: true })
    public async loginWithEmail(
      @Arg('email') email: string,
      @Arg('password') password: string,
      @Ctx() ctx: Context
    ): Promise< any > {

        try {
            const user = await this.userService.login(email, password);
            if ( user === undefined || user === null) {
                ctx.response.json({
                    message : 'Forbidden',
                    code: 403 });
            } else {
                return user;
            }
        } catch (error) {
            ctx.response.json({
                message : 'Forbidden',
                code: 403 });
        }

    }

}
