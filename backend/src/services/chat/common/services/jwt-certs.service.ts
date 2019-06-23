import { sign, decode } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import env from '../../env';

@Injectable()
export class JwtCertsService {
    public addToken(payload: object, expiresIn: number): string {
        return sign(payload, env.JWT_PRIV, {
            expiresIn,
            algorithm: 'RS256',
        });
    }

    public decodeToken<T>(token: string): T {
        return decode(token) as T;
    }
}
