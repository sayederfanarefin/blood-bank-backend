import { HttpError } from 'routing-controllers';

export class BatteryNotFoundError extends HttpError {
    constructor() {
        super(404, 'Battery not found!');
    }
}
