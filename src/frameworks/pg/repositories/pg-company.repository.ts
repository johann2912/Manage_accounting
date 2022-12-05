import { ICompanyRepository } from "../core/abstract/company.repository.abstract";
import { PgGenericRepository } from "./pg-generic.repository";

export class PgCompanyRepository<T> 
    extends PgGenericRepository<T>
    implements ICompanyRepository<T>
{};