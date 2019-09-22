import { EntityRepository, Repository } from 'typeorm';

import { MediaState } from '../../models/telematics/MediaState';

@EntityRepository(MediaState)
export class MediaStateRepository extends Repository<MediaState>  {

}
