import { Timestamp } from "./timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Company extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: String, nullable: false})
    name?: string;
    @Column({type: Number, nullable: false})
    address?: number
    @OneToMany((_type) => Product, product => product.company)
    product?: Product
};