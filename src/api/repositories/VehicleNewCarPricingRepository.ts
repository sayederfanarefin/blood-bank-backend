import { EntityRepository, Repository } from 'typeorm';

import { VehicleNewCarPricing } from '../models/VehicleNewCarPricing';

@EntityRepository(VehicleNewCarPricing)
export class VehicleNewCarPricingRepository extends Repository<VehicleNewCarPricing>  {

}
