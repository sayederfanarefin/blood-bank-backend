import { EntityRepository, Repository } from 'typeorm';

import { GuiSettings } from '../../models/telematics/GuiSettings';

@EntityRepository(GuiSettings)
export class GuiSettingsRepository extends Repository<GuiSettings>  {

}
