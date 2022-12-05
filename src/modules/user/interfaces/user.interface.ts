export interface IUser {
    id?:string
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date;
    full_name?: string;
    documentType?: number
    documentNumber?: string;
    email?: string;
    password?: string;
    age?: number;
    role?: number;
};