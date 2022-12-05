import { ICompany } from "./company.interface";

export interface ICompanyCreate extends ICompany {
    name?: string;
    address?: string;
};