export class AgeNotExistException extends Error {
    constructor(message?: string){
        super(message || "Edad inexistente")
        this.name= 'AgeNotExistException'
    }
}