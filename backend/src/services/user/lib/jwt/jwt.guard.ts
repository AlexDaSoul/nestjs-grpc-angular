import { verify } from 'jsonwebtoken';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { JWT_KEY_PUB } from './keys';
import { status as grpcStatus } from 'grpc';

export class JwtGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
        try {
            const meta = context.getArgByIndex(1);
            const token = meta.get('authorization')[0];

            if (token) {
                meta.user = verify(token, JWT_KEY_PUB, {
                    algorithms: ['RS256']
                });

                return true;
            }
        } catch (error) {
            throw new RpcException({ code: grpcStatus.UNAUTHENTICATED, message: error.message });
        }
    }
}
