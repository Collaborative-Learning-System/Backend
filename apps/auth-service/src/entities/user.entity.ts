import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
    role: UserRole;   
}

