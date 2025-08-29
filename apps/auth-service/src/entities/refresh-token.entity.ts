import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class RefreshToken {
    @Column({ nullable: false })
    token: string;

    @Column({ nullable: false })
    @PrimaryColumn()
    id: string;

    @Column({ nullable: false })
    expiresAt: Date;
}
    





