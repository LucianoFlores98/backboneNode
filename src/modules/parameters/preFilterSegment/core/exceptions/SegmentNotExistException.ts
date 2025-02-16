export class SegmentNotExistException extends Error {
    constructor(message?: string){
        super(message || "Inexistent segment")
        this.name= 'SegmentoNotExistException'
    }
}