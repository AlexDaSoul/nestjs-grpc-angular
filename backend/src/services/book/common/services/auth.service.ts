import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { api } from '../../grpc-proto/user';
import env from '../../env';

import { IUserAuthSearchConditions } from '../interfaces/user.types';
import { JwtCertsService } from './jwt-certs.service';
// import { User } from '../entities/user.entity';

import { UserService } from './user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtCertsService: JwtCertsService,
        private readonly userService: UserService,
    ) {}

/*    private comparePasswords(password: string, user: User): Observable<User> {
        return this.passwordService.comparePasswords(password, user.password, user.salt).pipe(
            flatMap(isSamePassword => {
                if (!isSamePassword) {
                    throw new Error('Invalid credentials');
                }
                return of(user);
            }),
        );
    }*/

    private getJwtToken(userId: string): Observable<{ token: string }> {
        return of({
            token: this.jwtCertsService.addToken({ id: userId }, +env.JWT_EXPIRE),
        });
    }

    public addJwtToken(conditions: IUserAuthSearchConditions, password: string): Observable<api.user.IAuthRes> {
/*        return this.userService.getVerifiedUserOrFail(conditions).pipe(
            flatMap(user => this.comparePasswords(password, user)),
            flatMap(user => this.getJwtToken(user.id)),
        );*/

        return null;
    }
}
