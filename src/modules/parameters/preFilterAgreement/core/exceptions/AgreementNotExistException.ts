export class AgreementNotExistException extends Error {
    constructor(message?: string){
        super(message || "Convenio inexistente")
        this.name= 'AgreementNotExistException'
    }
}