import { validate } from 'class-validator';

import { Token } from '../../../src/api/models/Token';

describe('TokenValidations', () => {

    test('Token should always have a token string', async (done) => {
        const token = new Token();
        const errorsOne = await validate(token);
        token.token = 'TestName';
        const errorsTwo = await validate(token);
        expect(errorsOne.length).toBeGreaterThan(errorsTwo.length);
        done();
    });

});
