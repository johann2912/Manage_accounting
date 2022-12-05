import { IUser } from "./user.interface";

export interface IUserCreate extends IUser {
    full_name?: string;
    documentType?: number
    documentNumber?: string;
    email?: string;
    password?: string;
    age?: number;
    role?: number;
};