import { RpcException } from '@nestjs/microservices';

interface IErrorCode {
    code: number;
    message: string;
}

export type ErrorCodeType = IErrorCode | null;

export type MetadataType = {
    [key: string]: string;
};

export class BaseException extends RpcException {
    constructor(errorCode: IErrorCode, metadata: MetadataType) {
        super({
            code: errorCode.code,

            // so far it has not been possible to find normal ways in Nest
            // to transmit the metadata in response with an error,
            // so we will sew this data into the message body
            message: JSON.stringify({
                message: errorCode.message,
                metadata
            })
        });
    }
}
