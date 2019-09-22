import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { User } from '../../grpc-proto/user/user.types_pb';
import { AuthReq } from '../../grpc-proto/user/auth_pb';
import { CreateUserReq, UpdateUserReq } from '../../grpc-proto/user/user_pb';

import {
    AlreadyExistsException,
    NotFoundException,
    UnauthenticatedException,
    EMAIL_ALREADY_EXISTS,
    USER_NOT_FOUND,
    AUTH_CREDENTIALS_INVALID,
} from '../../lib/exceptions';

import { UserEntity } from '../../db/entities/user.entity';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
    }

    private checkEmailExistence(email: string): Observable<void> {
        return from(this.userRepository.findOne({ email })).pipe(
            map(user => {
                if (user) {
                    throw new AlreadyExistsException(EMAIL_ALREADY_EXISTS);
                }

                return null;
            }),
        );
    }

    private getUserById(id: string): Observable<UserEntity> {
        return from(this.userRepository.findOne({ id })).pipe(
            map(user => {
                if (!user) {
                    throw new NotFoundException(USER_NOT_FOUND);
                }

                return user;
            }),
        );
    }

    public createUser(data: CreateUserReq.AsObject): Observable<User.AsObject> {
        return this.checkEmailExistence(data.email).pipe(
            map(() => this.userRepository.create({ ...data })),
            switchMap(user => from(this.userRepository.save(user))),
        );
    }

    public updateUser(data: UpdateUserReq.AsObject, id: string): Observable<void> {
        return this.getUserById(id).pipe(
            map(user => this.userRepository.merge(user, data)),
            switchMap(user => from(this.userRepository.save(user))),
            map(() => null),
        );
    }

    public deleteUser(id: string): Observable<void> {
        return this.getUserById(id).pipe(
            switchMap(user => from(this.userRepository.remove([user]))),
            map(() => null),
        );
    }

    public getUser(id: string): Observable<User.AsObject> {
        return this.getUserById(id);
    }

    public getUsersAll(): Observable<{ users: User.AsObject[] }> {
        return from(this.userRepository.find()).pipe(
            map(users => ({ users })),
        );
    }

    public verifyUser(data: AuthReq.AsObject): Observable<User.AsObject> {
        return from(this.userRepository.findOne({ ...data })).pipe(
            map(user => {
                if (!user) {
                    throw new UnauthenticatedException(AUTH_CREDENTIALS_INVALID);
                }

                return user;
            }),
        );
    }
}
