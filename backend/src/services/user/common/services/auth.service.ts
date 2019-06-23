import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { JWT_EXPIRE } from '../../env';
import { api } from '../../grpc-proto/user/auth';
import { User } from '../entities/user.entity';
import { JwtCertsService } from './jwt-certs.service';

const USER_ACTION_ERROR = 2;

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtCertsService: JwtCertsService,
    ) {
    }

    private verifiedAuthUser(data: api.user.AuthReq): Observable<api.user.User> {
        const findUser = this.userRepository.findOne({ ...data });

        return from(findUser).pipe(
            catchError(err => {
                return throwError({
                    status: USER_ACTION_ERROR,
                    message: `Invalid credentials: ${err}`,
                });
            }),
        );
    }

    public getJwtToken(id: string): { token: string } {
        return {
            token: this.jwtCertsService.addToken({ id }, +JWT_EXPIRE),
        };
    }

    public addJwtToken(data: api.user.AuthReq): Observable<api.user.AuthRes> {
        return this.verifiedAuthUser(data).pipe(
            map(user => {
                const token = this.getJwtToken(user.id);

                return {
                    ...token,
                    user,
                };
            }),
        );
    }
}
