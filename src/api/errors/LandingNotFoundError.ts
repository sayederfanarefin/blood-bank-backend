import { HttpError } from 'routing-controllers';

export class LandingNotFoundError extends HttpError {
    constructor() {
        super(404, 'Landing not found!');
    }
}
