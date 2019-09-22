import { BaseException, ErrorCodeType, MetadataType } from './BaseException';

import { IError, ECodes } from './code.types';

export const UNAVAILABLE: IError = {
    code: ECodes.UNAVAILABLE,
    message: 'Resource unavailable'
};

export class UnavailableException extends BaseException {
    constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
        super(customCode || UNAVAILABLE, metadata);
    }
}
