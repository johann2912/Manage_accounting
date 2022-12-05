import { Timestamp } from "./timestamp.entity";
import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "src/modules/user/interfaces/user.interface";

@Entity()
export class User extends Timestamp implements IUser {
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
    @Column({type: Number})
    age?: number;
    @Column({type: Number})
    role?: number;
};