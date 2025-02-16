export class WrongEmailException extends Error {
    constructor(message?: string){
        super(message || "Usuario incorrecto")
        this.name='WrongEmailException'
    }
}