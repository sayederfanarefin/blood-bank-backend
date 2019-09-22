import { HttpError } from 'routing-controllers';

export class HourlyNoRecordsError extends HttpError {
    constructor() {
        super(204, 'No record found');
    }
}
