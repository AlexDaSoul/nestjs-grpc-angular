import { sdex } from '@sdex/grpc-proto/common/errors';
import { RpcException } from '@nestjs/microservices';
import { QueryFailedError } from 'typeorm';

import * as errorCodes from './codes';

class BaseRpcException extends RpcException {
    constructor(errorCode: object) {
        super(errorCode);
    }
}

export class InvalidArgumentException extends BaseRpcException {
    constructor(customCode?: sdex.common.errors.InvalidArgument) {
        super(customCode || errorCodes.INVALID_ARGUMENT);
    }
}

export class NotFoundException extends BaseRpcException {
    constructor(customCode?: sdex.common.errors.NotFound) {
        super(customCode || errorCodes.NOT_FOUND);
    }
}

export class AlreadyExistsException extends BaseRpcException {
    constructor(customCode?: sdex.common.errors.AlreadyExists) {
        super(customCode || errorCodes.ALREADY_EXIST);
    }
}

export class PermissionDeniedException extends BaseRpcException {
    constructor(customCode?: sdex.common.errors.PermissionDenied) {
        super(customCode || errorCodes.PERMISSION_DENIED);
    }
}

export class InternalException extends BaseRpcException {
    static fromError(error: Error | QueryFailedError): InternalException {
        return new InternalException({
            code: errorCodes.INTERNAL_ERROR.code,
            message: error.message || error.toString()
        });
    }

    constructor(customCode?: sdex.common.errors.InternalError) {
        super(customCode || errorCodes.INTERNAL_ERROR);
    }
}

export class UnavailableException extends BaseRpcException {
    constructor(customCode?: sdex.common.errors.Unavailable) {
        super(customCode || errorCodes.UNAVAILABLE);
    }
}

export class UnauthenticatedException extends BaseRpcException {
    constructor(customCode?: sdex.common.errors.Unauthenticated) {
        super(customCode || errorCodes.UNAUTHENTICATED);
    }
}
