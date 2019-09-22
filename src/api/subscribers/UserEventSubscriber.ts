import { EventSubscriber, On } from 'event-dispatch';

// import { Container } from 'typedi';
import { Logger } from '../../lib/logger';
// import { UserDTO } from '../models/dto/teslaApi/UserDTO';
import { User } from '../models/User';
// import { SchedularModuleService } from '../services/SchedularModuleService';
import { events } from './events';

const log = new Logger(__filename);

@EventSubscriber()
export class UserEventSubscriber {

    // private readonly schedularModuleService = Container.get(SchedularModuleService);

    @On(events.user.created)
    public onUserCreate(user: User): void {
        log.info('User ' + user.toString() + ' created!');
        // const userDTO: UserDTO = {
        //     xyz: user.id,

        // }
        // this.schedularModuleService.schedule();
    }
}
