import { Injectable } from '@nestjs/common';
import { sign, verify, SignOptions } from 'jsonwebtoken';

import { UnauthenticatedException } from '../lib/exceptions';

import { JWT_EXPIRE, pemKeys } from '../env';

interface IDecodedUserData {
    id: string;
    email: string;
}

@Injectable()
export class JwtCertsService {
    public addToken(payload: object, expiresIn: number = +JWT_EXPIRE): string {
        const options: SignOptions = {
            algorithm: 'RS256',
        };

        if (expiresIn) {
            options.expiresIn = expiresIn;
        }

        return sign(payload, pemKeys.JWT_PRIV, {
            expiresIn,
            algorithm: 'RS256',
        });
    }

    public verifyToken(token: string): IDecodedUserData {
        try {
            return verify(token, pemKeys.JWT_PUB, {
                algorithms: ['RS256'],
            }) as IDecodedUserData;
        } catch (ignored) {
            throw new UnauthenticatedException();
        }
    }
}
