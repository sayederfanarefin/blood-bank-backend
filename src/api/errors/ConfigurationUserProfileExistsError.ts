import { HttpError } from 'routing-controllers';

export class ConfigurationUserProfileExistsError extends HttpError {
    constructor() {
        super(409, 'User profile already exist in system');
    }
}
