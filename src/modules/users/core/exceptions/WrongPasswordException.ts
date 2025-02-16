export class WrongPasswordException extends Error {
    constructor(message?: string){
        super(message || "Contraseña incorrecta")
        this.name='WrongEmailException'
    }
}