import { HttpError } from 'routing-controllers';

export class DashboardNotFoundError extends HttpError {
    constructor() {
        super(404, 'Dashboard not found!');
    }
}
