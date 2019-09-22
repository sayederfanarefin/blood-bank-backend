import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OptionCode {
    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public optionCode: string;

    @Column()
    public vehicleModel: string;

    @Column()
    public optionCodeFull: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id} ${this.optionCode} ${this.optionCodeFull} ${this.createdAt}`;
    }
}
