import { sign, verify, SignOptions } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { UnauthenticatedException } from '../lib/exceptions';
import { JWT_PRIV, JWT_PUB } from '../env';

type DecodedUserData = {
    id: string;
};

@Injectable()
export class JwtCertsService {
    public addToken(payload: object, expiresIn: number): string {
        const options: SignOptions = {
            algorithm: 'RS256'
        };

        if (expiresIn) {
            options.expiresIn = expiresIn;
        }

        return sign(payload, JWT_PRIV, {
            expiresIn,
            algorithm: 'RS256',
        });
    }

    public decodeToken(token: string): DecodedUserData {
        try {
            return <DecodedUserData>verify(token, JWT_PUB, {
                algorithms: ['RS256']
            });
        } catch (ignored) {
            throw new UnauthenticatedException();
        }
    }
}
