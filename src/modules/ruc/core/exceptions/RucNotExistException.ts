export class RucNotExistException extends Error {
    constructor(message?: string){
        super(message || "Registro de RUC inexistente")
        this.name= 'RucNotExistException'
    }
}