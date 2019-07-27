import { verify } from 'jsonwebtoken';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { status } from 'grpc';

import { JWT_KEY_PUB } from './keys';

export class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const meta = context.getArgByIndex(1);
        const token = meta.get('authorization')[0];

        if (token) {
            try {
                meta.payload = verify(token, JWT_KEY_PUB, {
                    algorithms: ['RS256'],
                });

                return true;
            } catch (error) {
                throw new RpcException({code: status.UNAUTHENTICATED, message: error.message});
            }
        } else {
            throw new RpcException({code: status.UNAUTHENTICATED, message: 'jwt must be provided'});
        }
    }
}
