import { Timestamp } from "./timestamp.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { CategoryProduct } from "./category-product.entity";

@Entity()
export class Product extends Timestamp {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: String, unique: true, nullable: true})
    code?: string;
    @Column({type: String, nullable: true})
    name?: string;
    @Column({type: String, nullable: true})
    description?: string;
    @Column({type: String})
    brand: string;
    @Column({type: 'bigint', nullable: true, default: 0})
    quantity: bigint;
    @Column({type: 'bigint', nullable: true, default: 0})
    price: bigint;
    @Column({type: Boolean, default: true, nullable: false})
    active?: boolean;
    @ManyToOne((_type) => Company, company => company.product)
    company?: Company
    @ManyToOne(
        (_type) => CategoryProduct, 
        categoryProduct => categoryProduct.product
    )
    categoryProduct?: CategoryProduct
};