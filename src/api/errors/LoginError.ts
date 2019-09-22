import { HttpError } from 'routing-controllers';

export class LoginError extends HttpError {
    constructor() {
        super(401, 'Login failed!');
    }
}
