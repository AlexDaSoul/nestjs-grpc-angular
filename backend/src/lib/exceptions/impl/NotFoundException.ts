import { BaseException, ErrorCodeType, MetadataType } from './BaseException';

import { IError, ECodes } from './code.types';

export const NOT_FOUND: IError = {
    code: ECodes.NOT_FOUND,
    message: 'Not found'
};

export const USER_NOT_FOUND: IError = {
    code: ECodes.USER_NOT_FOUND,
    message: 'User not found'
};

export class NotFoundException extends BaseException {
    constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
        super(customCode || NOT_FOUND, metadata);
    }
}
