import { Injectable } from '@nestjs/common';
import { sign, verify, SignOptions } from 'jsonwebtoken';

import { AUTH_CREDENTIALS_INVALID, UnauthenticatedException } from '@lib/exceptions';

import { User } from '@grpc-proto/user/user.types_pb';

import { JWT_EXPIRE } from '@auth/env';

interface IDecodedUserData {
    id: string;
    email: string;
}

const env = process.env;

@Injectable()
export class JwtCertsService {
    public addToken(user: User.AsObject, expiresIn: number = +JWT_EXPIRE): string {
        if (!user) {
            throw new UnauthenticatedException(AUTH_CREDENTIALS_INVALID);
        }

        const options: SignOptions = {
            algorithm: 'RS256',
        };

        if (expiresIn) {
            options.expiresIn = expiresIn;
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        return sign(payload, env.JWT_PRIV, {
            expiresIn,
            algorithm: 'RS256',
        });
    }

    public verifyToken(token: string): IDecodedUserData {
        try {
            return verify(token, env.JWT_PUB, {
                algorithms: ['RS256'],
            }) as IDecodedUserData;
        } catch (ignored) {
            throw new UnauthenticatedException();
        }
    }
}
