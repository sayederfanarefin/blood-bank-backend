import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { Logger, LoggerInterface } from '../../decorators/Logger';
import { UserProfileDTO } from '../models/dto/asif/UserProfileDTO';
import { VehicleOwnerProfileDTO } from '../models/dto/asif/VehicleOwnerProfileDTO';
import { User } from '../models/User';
import { UserProfile } from '../models/UserProfile';
import { UserProfileRepository } from '../repositories/UserProfileRepository';
import { UserRepository } from '../repositories/UserRepository';

import uuid = require('uuid');
// import { UserService } from './UserService';

@Service()
export class UserProfileService {

    constructor(
        @OrmRepository() private userProfileRepository: UserProfileRepository,
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository()  private userRepository: UserRepository

    ) {

    }

    public find(): Promise<UserProfile[]> {
        this.log.info('Find all UserProfile');
        return this.userProfileRepository.find();
    }

    public findOne(id: string): Promise<UserProfile> {
        this.log.info('Find one UserProfile');
        return this.userProfileRepository.findOne({ id });
    }
    public async findUserProfile(userId: string): Promise < VehicleOwnerProfileDTO > {

        return await this.userProfileRepository.createQueryBuilder('userProfile')
        .where('userProfile.user = :user')
        .setParameter('user', userId)
        .leftJoinAndSelect('userProfile.user', 'user')
        .getOne()
        .then ( async ( userProfile: UserProfile ) => {
            // this.log.info ('============================>>>>>>>>>>>>>>>>>>>>>' + userProfile.user.toString());
            return this.toVehicleOwnerProfileDTO ( userProfile );
        })
        .catch (( error ) => {
            console.log ( ' ====>>>> error ' + error);
            return undefined;
        });
    }

    public async create(userProfileDTO: UserProfileDTO, userId: string): Promise<UserProfile> {
        this.log.info( '==> user id: ' + userId);
        return await this.userRepository.findOne( { where: { id: userId }} )
        .then( async ( user: User) => {
            this.log.info( '==> got user: ' + user.email);
            const userProfile = new UserProfile();
            userProfile.avatar =  userProfileDTO.avatar;
            userProfile.currency =  userProfileDTO.currency;
            userProfile.distanceUnit =  userProfileDTO.distanceUnit;
            // userProfile.numberOfCars = userProfileDTO.numberOfCars;
            userProfile.companyName =  userProfileDTO.companyName;
            userProfile.employeeId =  userProfileDTO.employeeId;
            userProfile.zoneId =  userProfileDTO.zoneId;
            userProfile.distanceUnit =  userProfileDTO.distanceUnit;
            if ( userProfileDTO.phoneNumber === undefined ) {
                userProfile.phoneNumber =  'undefined';
            } else {
                userProfile.phoneNumber =  userProfileDTO.phoneNumber;
            }

            if ( userProfileDTO.companyName === undefined ) {
                userProfile.companyName =  'undefined';
            } else {
                userProfile.companyName =  userProfileDTO.companyName;
            }

            if ( userProfileDTO.avatar === undefined ) {
                userProfile.avatar =  'undefined';
            } else {
                userProfile.avatar =  userProfileDTO.avatar;
            }

            if ( userProfileDTO.employeeId === undefined ) {
                userProfile.employeeId =  'undefined';
            } else {
                userProfile.employeeId =  userProfileDTO.employeeId;
            }

            if ( userProfileDTO.distanceUnit === undefined ) {
                userProfile.distanceUnit =  'undefined';
            } else {
                userProfile.distanceUnit =  userProfileDTO.distanceUnit;
            }

            if ( userProfileDTO.currency === undefined ) {
                userProfile.currency =  'undefined';
            } else {
                userProfile.currency =  userProfileDTO.currency;
            }

            if ( userProfileDTO.zoneId === undefined ) {
                userProfile.zoneId =  'undefined';
            } else {
                userProfile.zoneId =  userProfileDTO.zoneId;
            }

            userProfile.user = user;
            userProfile.id = uuid.v4();
            return await this.userProfileRepository.save ( userProfile );
        })
        .catch( ( error ) => {
            console.log ( ' ====>>>> error ' + error);
            return undefined;
        });
    }

    public async update( userProfileDTO: UserProfileDTO, userId: string): Promise<UserProfile> {
        return await this.userRepository.findOne( { where: { id: userId }} )
        .then( async ( user: User) => {
            return await this.userProfileRepository.findOne({where: { user: { id: userId } } });
        })
        .then ( async ( userProfile: UserProfile ) => {
            userProfile.avatar =  userProfileDTO.avatar;
            userProfile.currency =  userProfileDTO.currency;
            userProfile.distanceUnit =  userProfileDTO.distanceUnit;
            // userProfile.numberOfCars = userProfileDTO.numberOfCars;
            userProfile.companyName =  userProfileDTO.companyName;
            userProfile.employeeId =  userProfileDTO.employeeId;
            userProfile.zoneId =  userProfileDTO.zoneId;
            userProfile.distanceUnit =  userProfileDTO.distanceUnit;
            userProfile.phoneNumber =  userProfileDTO.phoneNumber;
            return await this.userProfileRepository.update ( { id: userProfile.id }, userProfile );
        })
        .catch( ( error ) => {
            console.log ( ' ====>>>> error ' + error);
            return undefined;
        });
    }

    public async delete(id: string): Promise<void> {
        this.log.info('Delete a UserProfile');
        await this.userProfileRepository.delete(id);
        return;
    }

    private toVehicleOwnerProfileDTO( userProfile: UserProfile ): VehicleOwnerProfileDTO {
        const vehicleOwnerProfileDTO: VehicleOwnerProfileDTO = {
            // userId: string;
            phoneNumber: userProfile.phoneNumber,
            email: userProfile.user.email,
            firstName: userProfile.user.firstName,
            age: userProfile.user.age,
            sex: userProfile.user.gender,
            carUse: userProfile.user.useOfCar,
            // numberOfCars: userProfile.numberOfCars,
            companyName: userProfile.companyName,
            avatar: userProfile.avatar,
            employeeId: userProfile.employeeId,
            distanceUnit: userProfile.distanceUnit,
            zoneId: userProfile.zoneId,
            isSupper: undefined,
            currency: userProfile.currency,
            ovList: undefined,
            // mongoId: string;
        };
        return vehicleOwnerProfileDTO;
    }
}
