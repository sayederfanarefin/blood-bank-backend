import { HttpError } from 'routing-controllers';

export class HistogramNotFoundError extends HttpError {
    constructor() {
        super(404, 'HistogramNotFoundError not found!');
    }
}
