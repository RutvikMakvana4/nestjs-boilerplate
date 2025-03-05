import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor(status: number, message: string) {
        super(
            {
                success: false,
                status,
                message,
            },
            status,
        );
    }
}

// Bad Request Exception
export class BadRequestException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}

// Not Found Exception
export class NotFoundException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.NOT_FOUND, message);
    }
}

// Forbidden Exception
export class ForbiddenException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.FORBIDDEN, message);
    }
}

// Conflict Exception
export class ConflictException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.CONFLICT, message);
    }
}

// Unauthorized Exception
export class UnauthorizedException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}

// Internal Server Error Exception
export class InternalServerErrorException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }
}

// Validation Error Exception
export class ValidationErrorException extends CustomException {
    constructor(message: string) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, message); // 422 is standard for validation
    }
}