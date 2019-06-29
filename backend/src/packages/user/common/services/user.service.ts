import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { api } from '../../grpc-proto/user/user';
import { api as authApi } from '../../grpc-proto/user/auth';
import { User } from '../../db/entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    public createUser(data: api.user.CreateUserReq): Observable<api.user.User> {
        const createUser = this.userRepository.create({ ...data });

        return from(this.userRepository.save(createUser));
    }

    public updateUser(data: api.user.UpdateUserReq): Observable<void> {
        const findUser = this.userRepository.findOne({ id: data.id });

        return from(findUser).pipe(
            map(user => this.userRepository.merge(user, data)),
            switchMap(user => from(this.userRepository.save(user))),
            map(() => null),
        );
    }

    public deleteUser(id: string): Observable<void> {
        const findUser = this.userRepository.findOne(id);

        return from(findUser).pipe(
            switchMap(user => from(this.userRepository.remove([user]))),
            map(() => null),
        );
    }

    public getUser(id: string): Observable<api.user.User> {
        return from(this.userRepository.findOne(id));
    }

    public verifyUser(data: authApi.user.AuthReq): Observable<api.user.User> {
        return from(this.userRepository.findOne({ ...data }));
    }
}
