import { sdex } from '@sdex/grpc-proto/common/errors';
import { commonerrorsenum as errorEnum } from '@sdex/grpc-proto/common/errors.enum';

export const INVALID_ARGUMENT: sdex.common.errors.InvalidArgument = {
    code: errorEnum.ErrorCode.INVALID_ARGUMENT,
    message: 'Invalid argument'
};

export const NOT_FOUND: sdex.common.errors.NotFound = {
    code: errorEnum.ErrorCode.NOT_FOUND,
    message: 'Not found'
};
export const USER_NOT_FOUND: sdex.common.errors.UserNotFound = {
    code: errorEnum.ErrorCode.USER_NOT_FOUND,
    message: 'User not found'
};
export const DEVICE_NOT_FOUND: sdex.common.errors.DeviceNotFound = {
    code: errorEnum.ErrorCode.DEVICE_NOT_FOUND,
    message: 'Device not found'
};

export const ALREADY_EXIST: sdex.common.errors.AlreadyExists = {
    code: errorEnum.ErrorCode.ALREADY_EXIST,
    message: 'Resource already exists'
};
export const EMAIL_ALREADY_EXIST: sdex.common.errors.EmailAlreadyExists = {
    code: errorEnum.ErrorCode.EMAIL_ALREADY_EXIST,
    message: 'Email already exists'
};

export const PERMISSION_DENIED: sdex.common.errors.PermissionDenied = {
    code: errorEnum.ErrorCode.PERMISSION_DENIED,
    message: 'Permission denied'
};
export const USER_NOT_VERIFIED: sdex.common.errors.UserNotVerified = {
    code: errorEnum.ErrorCode.USER_NOT_VERIFIED,
    message: 'User not verified'
};
export const DEVICE_NOT_VERIFIED: sdex.common.errors.DeviceNotVerified = {
    code: errorEnum.ErrorCode.DEVICE_NOT_VERIFIED,
    message: 'Device not verified'
};
export const USER_ALREADY_VERIFIED: sdex.common.errors.UserAlreadyVerified = {
    code: errorEnum.ErrorCode.USER_ALREADY_VERIFIED,
    message: 'User already verified'
};
export const USER_ALREADY_DISABLED_2FA: sdex.common.errors.UserAlreadyDisabled2FA = {
    code: errorEnum.ErrorCode.USER_ALREADY_DISABLED_2FA,
    message: 'User already disabled two-factor authorization'
};

export const INTERNAL_ERROR: sdex.common.errors.InternalError = {
    code: errorEnum.ErrorCode.INTERNAL_ERROR,
    message: 'Internal error'
};

export const UNAVAILABLE: sdex.common.errors.Unavailable = {
    code: errorEnum.ErrorCode.UNAVAILABLE,
    message: 'Resource unavailable'
};

export const UNAUTHENTICATED: sdex.common.errors.Unauthenticated = {
    code: errorEnum.ErrorCode.UNAUTHENTICATED,
    message: 'Unauthenticated'
};
export const TOKEN_INVALID: sdex.common.errors.TokenInvalid = {
    code: errorEnum.ErrorCode.TOKEN_INVALID,
    message: 'Token invalid'
};
export const TOKEN_EXPIRED: sdex.common.errors.TokenExpired = {
    code: errorEnum.ErrorCode.TOKEN_EXPIRED,
    message: 'Token expired'
};
export const AUTH_CREDENTIALS_INVALID: sdex.common.errors.AuthCredentialsInvalid = {
    code: errorEnum.ErrorCode.AUTH_CREDENTIALS_INVALID,
    message: 'Auth credentials invalid'
};
