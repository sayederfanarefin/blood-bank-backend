import { HttpError } from 'routing-controllers';

export class VehicleDataNoRecordsError extends HttpError {
    constructor() {
        super(204, 'No record found');
    }
}
