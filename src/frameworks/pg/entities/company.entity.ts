import { Timestamp } from "./timestamp.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ICompany } from "src/modules/company/interfaces/company.interface";

@Entity()
export class Company extends Timestamp implements ICompany {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({type: String, nullable: false, unique: true})
    name?: string;
    @Column({type: String, nullable: false})
    address?: string;
    @OneToMany((_type) => Product, product => product.company)
    product?: Product;
};