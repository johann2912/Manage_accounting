import { Timestamp } from "./timestamp.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { CategoryProduct } from "./category-product.entity";
import { IProduct } from "src/modules/product/interfaces/product.interface";

@Entity()
export class Product extends Timestamp implements IProduct {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: String, unique: true, nullable: false})
    code?: string;
    @Column({type: String, nullable: false})
    name?: string;
    @Column({type: String, nullable: false})
    description?: string;
    @Column({type: String})
    brand?: string;
    @Column({type: 'bigint', nullable: false, default: 0})
    quantity?: bigint;
    @Column({type: 'bigint', nullable: false, default: 0})
    price?: bigint;
    @ManyToOne((_type) => Company, company => company.product)
    company?: Company
    @ManyToOne(
        (_type) => CategoryProduct, 
        categoryProduct => categoryProduct.product
    )
    categoryProduct?: CategoryProduct
};