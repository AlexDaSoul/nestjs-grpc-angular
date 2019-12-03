import { BaseException, ErrorCodeType, MetadataType } from './BaseException';

import { IError, ECodes } from './code.types';

export const UNAUTHENTICATED: IError = {
    code: ECodes.UNAUTHENTICATED,
    message: 'Unauthenticated',
};

export const TOKEN_INVALID: IError = {
    code: ECodes.TOKEN_INVALID,
    message: 'Token invalid',
};

export const TOKEN_EXPIRED: IError = {
    code: ECodes.TOKEN_EXPIRED,
    message: 'Token expired',
};

export const AUTH_CREDENTIALS_INVALID: IError = {
    code: ECodes.AUTH_CREDENTIALS_INVALID,
    message: 'Auth credentials invalid',
};

export class UnauthenticatedException extends BaseException {
    constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
        super(customCode || UNAUTHENTICATED, metadata);
    }
}
