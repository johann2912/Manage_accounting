import { Timestamp } from "./timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class CategoryProduct extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: String, unique: true, nullable: false})
    code?: string;
    @Column({type: String, nullable: false})
    name?: string;
    @Column({type: String, nullable: false})
    description?: string;
    @Column({type: Boolean, default: true, nullable: false})
    active?: boolean;
    @OneToMany(
        (_type) => Product, product => product.company
    )
    product?: Product
};