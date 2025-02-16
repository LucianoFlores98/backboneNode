export class WrongUidCredentialsException extends Error {
    static defaultMessage = "Uid incorrecto";

    constructor(message?: string){
        super(message || WrongUidCredentialsException.defaultMessage)
        this.name='WrongUidCredentialsException'
    }
}