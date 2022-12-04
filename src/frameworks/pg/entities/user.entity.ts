import { Timestamp } from "./timestamp.entity";
import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: String})
    full_name?: string;
    @Column({type: Number})
    documentType?: number
    @Column({type: String, unique:true})
    documentNumber?: string;
    @Column({type: String, unique:true})
    email?: string;
    @Column({type: String})
    password?: string;
    @Column({type: String})
    age?: string;
    @Column({type: Number})
    role?: number;
};