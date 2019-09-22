import { HttpError } from 'routing-controllers';

export class ConfigurationBadRequestError extends HttpError {
    constructor() {
        super(400, 'Bad request, something went wrong');
    }
}
