export class InvalidFileException extends Error {
    constructor(message?: string){
        super(message || "Archivo inválido.")
        this.name='InvalidIdException' 
    }
}