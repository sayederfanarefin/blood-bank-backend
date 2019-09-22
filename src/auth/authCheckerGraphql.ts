import { Context } from 'src/api/Context';

// import { Container } from 'typedi';
import { AuthChecker } from './AuthChecker';
// import { AuthService } from './AuthService';
import { CheckerClass } from './CheckerClass';

export const customAuthChecker: AuthChecker<Context> =
({ context }) => {

    // const authService = Container.get<AuthService>(AuthService);

    const checkerClass = new CheckerClass();
    const authorization =  context.request.header('authorization');
    if ( (authorization && authorization.split(' ')[0] === 'Bearer')) {

        const accessToken = authorization.split(' ')[1];

        const result = checkerClass.check(accessToken);
        if (result) {
            checkerClass.getUserId(accessToken).then( ( userId ) => {
                 context.userId = userId;
            });
        }
        return result;

    } else if (context.request.cookies.authorization) {
        const result = checkerClass.check(context.request.cookies.authorization);
        if (result) {
            checkerClass.getUserId(context.request.cookies.authorization).then( ( userId ) => {
                context.userId = userId;
            });
        }
        return result;
    } else {

        context.response.json({
            code: 401,
            message: 'Unauthorized!',
        });
        return false;
    }

  };
