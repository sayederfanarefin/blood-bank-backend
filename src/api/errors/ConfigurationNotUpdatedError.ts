import { HttpError } from 'routing-controllers';

export class ConfigurationNotUpdatedError extends HttpError {
    constructor() {
        super(304, 'If profile was not updated successfully');
    }
}
