import { Observable } from 'rxjs';
import { IJwtMeta } from '@lib/jwt/jwt.interface';
import { api } from '@grpc/user/auth';
import { UserService } from '../common/services/user.service';
import { JwtCertsService } from './jwt-certs.service';
declare type Identity<T> = T;
export declare class AuthController {
    private readonly userService;
    private readonly jwtCertsService;
    constructor(userService: UserService, jwtCertsService: JwtCertsService);
    private getResult;
    auth(data: Identity<api.user.AuthReq>): Observable<api.user.AuthRes>;
    updateAuth(data: Identity<api.user.Empty>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.user.AuthRes>;
}
export {};
