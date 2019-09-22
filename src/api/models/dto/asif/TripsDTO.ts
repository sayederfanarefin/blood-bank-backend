export interface Trip {
    startTime: string;
    endTime:	string;
    startPlace:	string;
    endPlace:	string;
    totalMinutes:	number;
    distance:	number;
    bStrtLvl:	number;
    bEndLvl:	number;
    vehicleCoordinates: number[][];
}
