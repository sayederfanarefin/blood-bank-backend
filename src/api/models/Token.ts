import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Token {

    @PrimaryColumn('uuid')
    public id: string;

    @Column({ name: 'user_id', type: 'varchar', nullable: true })
    public userId: string;

    @Column()
    public token: string;

    @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP'})
    public createdAt: string;

    public toString(): string {
        return `userId: ${this.userId} , Token: ${this.token}, Created At: ${this.createdAt}, ID: ${this.id}`;
    }
}
