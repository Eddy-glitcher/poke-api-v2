export class ApiError extends Error{
    details?: string;
    statusCode : number;

    constructor(message : string, statusCode: number, details?: string){
        super(message);

        this.statusCode = statusCode;
        this.details = details

        Object.setPrototypeOf(this, ApiError.prototype);
    }
}