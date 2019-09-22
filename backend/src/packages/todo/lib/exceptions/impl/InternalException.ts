import { BaseException, ErrorCodeType, MetadataType } from './BaseException';

import { IError, ECodes } from './code.types';

export const INTERNAL_ERROR: IError = {
    code: ECodes.INTERNAL_ERROR,
    message: 'Internal error',
};

export class InternalException extends BaseException {
    constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
        super(customCode || INTERNAL_ERROR, metadata);
    }
}
