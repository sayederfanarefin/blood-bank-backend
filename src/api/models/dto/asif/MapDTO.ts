import { Trip } from './TripsDTO';

export interface Map {
    name: string;
    totalHours: number;
    distanceUnit: string;
    tDis: number;
    odo: number;
    trips: Trip[];
  }
