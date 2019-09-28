import { sign, verify, SignOptions } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UnauthenticatedException } from '../lib/exceptions';

import { JWT_EXPIRE, JWT_PRIV, JWT_PUB } from '../env';

import { User } from '../grpc-proto/user/user.types_pb';
import { AuthRes } from '../grpc-proto/user/auth_pb';

interface IDecodedUserData {
    id: string;
}

@Injectable()
export class JwtCertsService {

    public addTokenWithPayload(user: User.AsObject): AuthRes.AsObject {
        const token = this.addToken({ id: user.id }, +JWT_EXPIRE);

        return { token, user };
    }

    public addToken(payload: object, expiresIn: number): string {
        const options: SignOptions = {
            algorithm: 'RS256',
        };

        if (expiresIn) {
            options.expiresIn = expiresIn;
        }

        return sign(payload, JWT_PRIV, {
            expiresIn,
            algorithm: 'RS256',
        });
    }

    public decodeToken(token: string): IDecodedUserData {
        try {
            return verify(token, JWT_PUB, {
                algorithms: ['RS256'],
            }) as IDecodedUserData;
        } catch (ignored) {
            throw new UnauthenticatedException();
        }
    }
}
