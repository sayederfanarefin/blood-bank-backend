import { HttpError } from 'routing-controllers';

export class MapBadRequestError extends HttpError {
    constructor() {
        super(404, 'Bad request, some values were missing');
    }
}
