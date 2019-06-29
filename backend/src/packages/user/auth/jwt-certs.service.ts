import { sign } from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

import { JWT_PRIV } from '../env';

@Injectable()
export class JwtCertsService {
    public addToken(payload: object, expiresIn: number): string {
        return sign(payload, JWT_PRIV, {
            expiresIn,
            algorithm: 'RS256',
        });
    }
}
