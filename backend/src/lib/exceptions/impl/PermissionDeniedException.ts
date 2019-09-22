import { BaseException, ErrorCodeType, MetadataType } from './BaseException';

import { IError, ECodes } from './code.types';

export const PERMISSION_DENIED: IError = {
    code: ECodes.PERMISSION_DENIED,
    message: 'Permission denied'
};

export class PermissionDeniedException extends BaseException {
    constructor(customCode?: ErrorCodeType, metadata: MetadataType = {}) {
        super(customCode || PERMISSION_DENIED, metadata);
    }
}
