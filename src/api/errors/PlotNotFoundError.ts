import { HttpError } from 'routing-controllers';

export class PlotNotFoundError extends HttpError {
    constructor() {
        super(404, 'PlotNotFoundError not found!');
    }
}
