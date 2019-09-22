import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Image {

    @PrimaryColumn('uuid')
    public id: string;

    @Column()
    public url: string;

    @Column()
    public tag: string;

    @Column()
    public subtag: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `${this.id} ${this.url} ${this.tag} ${this.createdAt}`;
    }
}
