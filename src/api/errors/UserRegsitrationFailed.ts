import { HttpError } from 'routing-controllers';

export class UserRegsitrationFailed extends HttpError {
    constructor() {
        super(400, 'User not registered! Something went wrong!');
    }
}
