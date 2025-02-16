export class TypeOfAgreementNotExistException extends Error {
    constructor(message?: string){
        super(message || "Tipo de convenio inexistente")
        this.name= 'TypeOfAgreementNotExistException'
    }
}