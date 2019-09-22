import { EntityRepository, Repository } from 'typeorm';

import { VehiclePricingStats } from '../models/VehiclePricingStats';

@EntityRepository(VehiclePricingStats)
export class VehiclePricingStatsRepository extends Repository<VehiclePricingStats>  {

}
