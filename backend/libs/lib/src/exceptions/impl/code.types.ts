export interface IError {
    code: number;
    message: string;
}

export enum ECodes {
    ERROR_CODE_UNDEFINED = 0,
    // invalid argument codes
    INVALID_ARGUMENT = 3,
    // required codes
    USER_ID_REQUIRED = 301,
    // not found codes
    NOT_FOUND = 5,
    USER_NOT_FOUND = 501,
    // already exist codes
    ALREADY_EXIST = 6,
    EMAIL_ALREADY_EXISTS = 601,
    // permission denied codes
    PERMISSION_DENIED = 7,
    // internal error codes
    INTERNAL_ERROR = 13,
    // unavailable codes
    UNAVAILABLE = 14,
    // unauthenticated codes
    UNAUTHENTICATED = 16,
    TOKEN_INVALID = 16001,
    TOKEN_EXPIRED = 16002,
    AUTH_CREDENTIALS_INVALID = 16003,
}
