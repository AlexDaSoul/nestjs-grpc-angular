import { verify } from 'jsonwebtoken';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from 'grpc';

import { UnauthenticatedException } from '../exceptions';
import { JWT_KEY_PUB } from './keys';

const TOKEN_HEADER_NAME = 'authorization';
const DECODING_OPTIONS = {
    algorithms: ['RS256']
};

export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const meta = context.getArgByIndex(1);
        const token = meta.get(TOKEN_HEADER_NAME)[0];

        if (token) {
            try {
                meta.payload = verify(token, JWT_KEY_PUB, DECODING_OPTIONS);

                return true;
            } catch (error) {
                throw new RpcException({code: status.UNAUTHENTICATED, message: error.message});
            }
        } else {
            throw new UnauthenticatedException();
        }
    }
}
