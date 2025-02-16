export class PipeNotExistException extends Error {
    constructor(message?: string){
        super(message || "Pipe inexistente")
        this.name= 'PipeNotExistException'
    }
}