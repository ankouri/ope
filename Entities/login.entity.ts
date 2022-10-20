import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Login {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({unique: true})
    email: string;
    @Column()
    password: string;
}