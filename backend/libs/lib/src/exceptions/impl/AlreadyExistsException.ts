import { BaseException, ErrorCodeType, MetadataType } from './BaseException';

import { IError, ECodes } from './code.types';

export const ALREADY_EXIST: IError = {
    code: ECodes.ALREADY_EXIST,
    message: 'Resource already exists',
};

export const EMAIL_ALREADY_EXISTS: IError = {
    code: ECodes.EMAIL_ALREADY_EXISTS,
    message: 'Email already exists',
};

export class AlreadyExistsException extends BaseException {
    constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
        super(customCode || ALREADY_EXIST, metadata);
    }
}
