import { Observable } from 'rxjs';
import { IJwtMeta } from '@lib/jwt/jwt.interface';
import { api } from '@grpc/user/user';
import { UserService } from '../common/services/user.service';
declare type Identity<T> = T;
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(data: Identity<api.user.CreateUserReq>): Observable<api.user.UserRes>;
    updateUser(data: Identity<api.user.UpdateUserReq>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.user.UserRes>;
    deleteUser(data: Identity<api.user.UserReq>): Observable<api.user.UserRes>;
    getUser(data: Identity<api.user.UserReq>): Observable<api.user.User>;
}
export {};
