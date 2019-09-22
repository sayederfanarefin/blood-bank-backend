import * as express from 'express';
import { Service } from 'typedi';

// import { OrmRepository } from 'typeorm-typedi-extensions';
import { User } from '../api/models/User';
import { UserService } from '../api/services/UserService';
import { Logger, LoggerInterface } from '../decorators/Logger';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private userService: UserService
    ) { }

    public parseBasicAuthFromRequest(req: express.Request): { username: string, password: string } {
        const authorization = req.header('authorization');

        if (authorization && authorization.split(' ')[0] === 'Basic') {
            this.log.info('Credentials provided by the client');
            const decodedBase64 = Buffer.from(authorization.split(' ')[1], 'base64').toString('ascii');
            const username = decodedBase64.split(':')[0];
            const password = decodedBase64.split(':')[1];
            if (username && password) {
                return { username, password };
            }
        }

        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public parseAccessTokenFromRequest(req: express.Request): { accessToken: string } {
        const authorization = req.header('authorization');

        if ( (authorization && authorization.split(' ')[0] === 'Bearer')) {
            this.log.info('Token provided by the client');
            const accessToken = authorization.split(' ')[1];
            if ( accessToken ) {
                return { accessToken };
            }
        }
        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public parseAccessTokenFromCookie(authorization: string): { accessToken: string } {

        if ( (authorization && authorization.split(' ')[0] === 'Bearer')) {
            this.log.info('Token provided by the client');
            const accessToken = authorization.split(' ')[1];
            if ( accessToken ) {
                return { accessToken };
            }
        }
        this.log.info('No credentials provided by the client');
        return undefined;
    }

    public async validateToken(accessToken: string): Promise<User> {
        return await this.userService.tokenExists(accessToken)
        .then( async ( result: boolean ) => {
            if (result) {
                const user = await this.userService.getUserWithToken(accessToken);
                return user;
            } else {
                return undefined;
            }
        })
        .catch( ( error ) => {
            this.log.error( '====> error ' + error);
            return undefined;
        });
    }

}
