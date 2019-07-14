import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { api } from '@grpc/user/user';
import { api as authApi } from '@grpc/user/auth';
import { User } from '../../db/entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(data: api.user.CreateUserReq): Observable<api.user.User>;
    updateUser(data: api.user.UpdateUserReq, id: string): Observable<void>;
    deleteUser(id: string): Observable<void>;
    getUser(id: string): Observable<api.user.User>;
    verifyUser(data: authApi.user.AuthReq): Observable<api.user.User>;
}
