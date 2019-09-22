import { OwnerVehicleDTO } from './OwnerVehicleDTO';

export interface VehicleOwnerProfileDTO {
    // userId: string;
    email: string;
    firstName: string;
    age: number;
    sex: string;
    carUse: string;
    phoneNumber: string;
    // numberOfCars: number;
    companyName: string;
    avatar: string;
    employeeId: string;
    distanceUnit: string;
    zoneId: string;
    isSupper: boolean;
    currency: string;
    ovList: OwnerVehicleDTO[];
    // mongoId: string;
  }
