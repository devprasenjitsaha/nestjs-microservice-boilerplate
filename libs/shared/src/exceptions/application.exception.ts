import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

/**
 * Custom application exception that follows our error structure
 * All services should throw this exception for consistent error handling
 */
export class ApplicationException extends Error {
    public readonly errCode: ErrorCode;
    public readonly statusCode: number;
    public readonly customMessage?: string;

    constructor(errCode: ErrorCode, statusCode: number = HttpStatus.BAD_REQUEST, customMessage?: string) {
        super(customMessage);
        this.errCode = errCode;
        this.statusCode = statusCode;
        this.customMessage = customMessage;
        this.name = 'ApplicationException';

        // Maintains proper stack trace for where our error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
}
