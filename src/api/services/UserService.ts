import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { EventDispatcher, EventDispatcherInterface } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { env } from '../../env';
// import { UserProfile } from '../models/asif/UserProfile';
import { UserProfileDTO } from '../models/dto/asif/UserProfileDTO';
import { UserInput } from '../models/dto/UserInputDTO';
import { UserInputForUserProfile } from '../models/dto/UserInputForUserProfile';
import { UserInputWithoutEmailPassDTO } from '../models/dto/UserInputWithoutEmailPassDTO';
import { Token } from '../models/Token';
import { User } from '../models/User';
import { TokenRepository } from '../repositories/TokenRepository';
import { UserRepository } from '../repositories/UserRepository';
import { events } from '../subscribers/events';
import { UserProfileService } from './UserProfileService';

import uuid = require('uuid');
@Service()
export class UserService {

      private readonly firebaseApp: firebase.app.App;
      private readonly firebaseAdmin: admin.app.App;

    constructor(
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private tokenRepository: TokenRepository,
        private userProfileService: UserProfileService,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
        @Logger(__filename) private log: LoggerInterface
    ) {
         this.firebaseApp = firebase.initializeApp(env.firebase.clientConfig);
         this.firebaseAdmin = admin.initializeApp({
            credential: admin.credential.cert({
                projectId: env.firebase.serviceAccount.project_id,
                clientEmail: env.firebase.serviceAccount.client_email,
                privateKey: env.firebase.serviceAccount.private_key,
            }),
            databaseURL: env.firebase.serviceAccount.database_url,
          });

    }

    public findOne(id: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
               id,
             }});
    }

    public async create(user: User): Promise< boolean > {
        // this.log.info('Create a new user => ', user.toString());
        user.id = uuid.v4();
        return await this.userRepository.save(user)
        .catch( ( error ) => {
            this.log.error('========>>>>>>>>>> error while saving user: ' + error);
            return false;
        })
        .then( ( ) => {
            this.eventDispatcher.dispatch(events.user.created, user);
            return true;
        });

    }

    public update(id: string, user: User): Promise<User> {
        user.id = id;
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
        return;
    }

    public async registerWithEmail(user: UserInput): Promise< boolean > {
        const userModel = new User();
        userModel.age = user.age;
        userModel.email = user.email;
        userModel.firstName = user.firstName;
        // userModel.lastName = user.lastName;
        userModel.password = user.password;
        // userModel.profilePictureUrl = user.profilePictureUrl;
        userModel.useOfCar = user.useOfCar;
        userModel.gender = user.gender;
        userModel.numberOfCars = user.numberOfCars;
        return await this.firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then ( async () => {
            userModel.id = await this.firebaseApp.auth().currentUser.uid;
            return userModel;
        })
       .then( async ( userModelUpdated: User ) => {
            return await this.create(userModelUpdated);
        })
        .catch ( (error) => {
            this.log.info (' caught this beautiful error => ' + error);
            return false;
        });
    }

    public async register(user: UserInputWithoutEmailPassDTO): Promise<any> {
        const userModel = new User();
        userModel.age = user.age;
        userModel.firstName = user.firstName;
        // userModel.lastName = user.lastName;
        // userModel.profilePictureUrl = user.profilePictureUrl;
        userModel.useOfCar = user.useOfCar;
        userModel.gender = user.gender;
        userModel.numberOfCars = user.numberOfCars;
        return await this.firebaseAdmin.auth().verifyIdToken(user.idToken)
        .then ( async (decodedToken) => {
           return await this.firebaseAdmin.auth().getUser( decodedToken.uid);
        })
        .then ( ( userRecord) => {
            userModel.email = userRecord.email;
            userModel.id = userRecord.uid;
            return userModel;
        }).then( async ( userModelUpdated: User ) => {
            return await this.create(userModelUpdated);
        })
        .catch ( (error) => {
            this.log.error ( ' User registration error: ' + error ) ;
            return false;
        });
    }

    public async registerLikeAsif( user: UserInputForUserProfile ): Promise<any> {
        const userModel = new User();
        userModel.age = user.age;
        userModel.firstName = user.firstName;
        userModel.useOfCar = user.useOfCar;
        // userModel.gender = user.sex;
        userModel.numberOfCars = user.numberOfCars;
        userModel.id = user.userId;
        if ( user.sex === undefined ) {
            userModel.gender = 'undefined';
        } else {
            userModel.gender = user.sex;
        }

        return await this.firebaseAdmin.auth().getUser( user.userId )
        .then ( async ( userRecord ) => {
            userModel.email = userRecord.email;
            await this.create(userModel);
            return userModel;
        }).then ( async ( newUser: User) => {
            const userProfile: UserProfileDTO = {
                phoneNumber: user.phoneNumber,
                companyName: user.companyName,
                avatar: user.avatar,
                employeeId: user.employeeId,
                distanceUnit: user.distanceUnit,
                zoneId: user.zoneId,
                currency: user.currency,
            };
            return await this.userProfileService.create(userProfile, newUser.id);
        })
        .catch ( (error) => {
            this.log.error ( ' User registration error: ' + error ) ;
            return undefined;
        });
    }

    public async login( email: string, password: string): Promise< any > {
        return await this.firebaseApp.auth().signInWithEmailAndPassword (email, password)
        .then( async () => {
            return await this.firebaseApp.auth().currentUser.getIdToken(true);
        })
        .then( async (idToken: string) => {
            const token = new Token();
            token.token = idToken;
            return token;
        })
        .then ( async ( token: Token ) => {
            const tokenFb = await this.firebaseApp.auth().currentUser.uid;
            token.userId = tokenFb;
            return token;
        })
        .then ( async ( token: Token) => {
            return await this.tokenRepository.findOne({
                where: {
                    userId: token.userId,
                }})
                .then( async ( token2: Token) => {
                    if (token2 !== undefined) {
                        await this.tokenRepository.delete(token2.id);
                    }
                    return token;
                });
        })
        .then ( async ( token: Token) => {

            token.id = uuid.v4();
            this.log.info('======token: ' + token.toString());
            return await this.tokenRepository.save(token);
        })
        .then ( ( token: Token) => {
            return token.token;
        })
        .catch( ( error ) => {
            this.log.error('something vivid comes again in to my mind: ' + error);
            return undefined;
          });
    }

    public async tokenExists( idToken: string): Promise <boolean> {
        return await this.tokenRepository.findOne({
            where: {
                token: idToken,
             }})
             .then ( ( token: Token) => {
                if ( token !== null && token !== undefined) {

                    return true;
                 } else {
                    return false;
                 }
             });
     }

     public async printStuff( stuff: string): Promise < any > {
         return undefined;
     }

     public async getUserWithToken( idToken: string): Promise <User> {
        //  this.log.info ('gonna get user with this token: ' + idToken);
        return await this.tokenRepository.findOne({
            where: {
                token: idToken,
             }})
             .then( async ( token: Token ) => {
                return await this.userRepository.findOne({
                    where: {
                        userId: token.userId,
                    }});
             });
     }

    public async loginWithIdToken( idToken: string): Promise < any > {
        return await this.firebaseAdmin.auth().verifyIdToken(idToken)
        .then( async (decodedToken) => {
            return await this.findOne( decodedToken.uid );
        })
        .then( async ( user: User) => {

            if (user.id === undefined) {
                return undefined;
            } else {
                const token = new Token();
                token.token = idToken;
                token.userId = user.id;
                return token;
            }
        })
        .then ( async ( token: Token) => {
            return await this.tokenRepository.findOne({
                where: {
                    userId: token.userId,
                }})
                .then( async ( token2: Token) => {
                    if (token2 !== undefined) {
                        await this.tokenRepository.delete(token2.id);
                    }
                    return token;
                });
        })
        .then ( async ( token: Token) => {
            token.id = uuid.v4();
            return await this.tokenRepository.save(token);
        })
        .then ( ( token: Token) => {
            return token.token;
        })
        .catch( ( error ) => {
            return undefined;
          });

    }

    public async validateIdToken( idToken: string): Promise < boolean > {
        return await this.tokenExists( idToken )
        .then( async ( result: boolean) => {
            if ( result ) {
                return result;
            } else {
                return await this.firebaseAdmin.auth().verifyIdToken(idToken)
                .then( async (decodedToken) => {
                    return await this.findOne( decodedToken.uid );
                })
                .then( async ( user: User) => {
                    if (user.id === undefined) {
                        return undefined;
                    } else {
                        const token = new Token();
                        token.token = idToken;
                        token.userId = user.id;
                        return token;
                    }
                })
                .then ( async ( token: Token) => {
                    if ( token === undefined ) {
                        return false;
                    } else {
                        // token.id = uuid.v4();
                        await this.tokenRepository.save(token);
                        return true;
                    }
                })
                .catch( ( error ) => {
                    return false;
                  });
            }
        })
        .catch( ( error ) => {
            return false;
          });

    }

}
