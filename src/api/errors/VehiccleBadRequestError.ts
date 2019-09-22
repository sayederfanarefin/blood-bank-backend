import { HttpError } from 'routing-controllers';

export class VehicleBadRequestError extends HttpError {
    constructor() {
        super(400, 'Bad request, some values were missing');
    }
}
