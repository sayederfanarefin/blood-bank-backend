import { EntityRepository, Repository } from 'typeorm';

import { VehiclePricing } from '../models/VehiclePricing';

@EntityRepository(VehiclePricing)
export class VehiclePricingRepository extends Repository<VehiclePricing>  {

}
