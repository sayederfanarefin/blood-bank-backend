import { JsonController, OnUndefined, Post, QueryParam } from 'routing-controllers';

import { LoginError } from '../errors/LoginError';
// import { UserRegsitrationFailed } from '../errors/UserRegsitrationFailed';
// import { UserInput } from '../models/dto/UserInputDTO';
// import { UserInputWithoutEmailPassDTO } from '../models/dto/UserInputWithoutEmailPassDTO';
import { UserService } from '../services/UserService';

@JsonController('/auth')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

     // return {
        //     code: 500,
        //     message: error.message,
        // };

    // @Post('/register')
    // @HttpCode(201)
    // @OnUndefined(UserRegsitrationFailed)
    // public async register(@Body() userInputWithoutEmailPassDTO: UserInputWithoutEmailPassDTO): Promise<any> {
    //      return await this.userService.register(userInputWithoutEmailPassDTO)
    //      .then ( ( result: boolean ) => {
    //         console.log ( 'Register user result: ' + result);
    //         if (result) {
    //             return {
    //                 message: 'User registered!',
    //             };
    //          } else {
    //             return undefined;
    //          }
    //      });
    // }

    // @Post('/registerWithEmail')
    // @HttpCode(201)
    // @OnUndefined(UserRegsitrationFailed)
    // public async registerWithEmail( @Body() userInput: UserInput): Promise<any> {
    //     return await this.userService.registerWithEmail(userInput)
    //     .then ( ( result: boolean ) => {
    //         console.log ( 'Register user result: ' + result);
    //         if (result) {
    //             return {
    //                 message: 'User registered!',
    //             };
    //          } else {
    //             return undefined;
    //          }
    //      });
    // }

    @Post('/emailLogin')
    @OnUndefined(LoginError)
    public async emailLogin(@QueryParam('email') email: string, @QueryParam('password') password: string): Promise<any> {
        const result =  await this.userService.login( email, password);
        console.log ( ' from controller: ' + result);
        return result;
    }

    @Post('/tokenLogin')
    @OnUndefined(LoginError)
    public async tokenLogin( @QueryParam('idToken') idToken: string ): Promise<any> {
        const result =  await this.userService.loginWithIdToken(idToken);
        console.log ( ' from controller: ' + result);
        return result;
    }
}
