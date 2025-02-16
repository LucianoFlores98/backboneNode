import IRegister from "./IRegister";

export interface IResponsePaginatedRegister {
    totalItems: number, 
    registers: IRegister[], 
    totalPages: number, 
    currentPage: number
}
