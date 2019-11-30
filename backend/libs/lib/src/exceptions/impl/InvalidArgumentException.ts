import { BaseException, ErrorCodeType, MetadataType } from './BaseException';

import { IError, ECodes } from './code.types';

export const INVALID_ARGUMENT: IError = {
    code: ECodes.INVALID_ARGUMENT,
    message: 'Invalid argument',
};

export const USER_ID_REQUIRED: IError = {
    code: ECodes.USER_ID_REQUIRED,
    message: 'User id is required',
};

export class InvalidArgumentException extends BaseException {
    constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
        super(customCode || INVALID_ARGUMENT, metadata);
    }
}
