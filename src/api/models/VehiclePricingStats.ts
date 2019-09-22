import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class VehiclePricingStats {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public make: string;

    @Column()
    public model: string;

    @Column()
    public year: number;

    @Column()
    public priceUpper: number;

    @Column()
    public battery: string;

    @Column()
    public priceLower: number;

    @Column()
    public count: number;

    @Column()
    public date: string;

    public toString(): string {
        return `${this.id} ${this.priceUpper} ${this.priceLower} ${this.count}  ${this.date} ${this.make} ${this.model} ${this.year} ${this.battery}`;
    }
}
