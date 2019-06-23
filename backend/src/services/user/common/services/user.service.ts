import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { api } from '../../grpc-proto/user/user';
import { User } from '../entities/user.entity';

const USER_ACTION_SUCCESS = 1;
const USER_ACTION_ERROR = 2;

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    public createUser(data: api.user.CreateUserReq): Observable<api.user.UserRes> {
        const createUser = this.userRepository.create({ ...data });

        return from(this.userRepository.save(createUser)).pipe(
            map(res => {
                return {
                    status: USER_ACTION_SUCCESS,
                    message: `User created successfully: ID: ${res.id}`,
                };
            }),
            catchError(err => {
                return throwError({
                    status: USER_ACTION_ERROR,
                    message: `Can\'t create user: ${err}`,
                });
            }),
        );
    }

    public updateUser(data: api.user.UpdateUserReq): Observable<api.user.UserRes> {
        const findUser = this.userRepository.findOne({ id: data.id });

        return from(findUser).pipe(
            switchMap(user => {
                const updateUser = this.userRepository.update({ id: user.id }, data);

                return from(updateUser).pipe(
                    map(() => {
                        return {
                            status: USER_ACTION_SUCCESS,
                            message: `User update successfully: ID: ${user.id}`,
                        };
                    }),
                    catchError(err => {
                        return throwError({
                            status: USER_ACTION_ERROR,
                            message: `Can\'t update user: ${err}`,
                        });
                    }),
                );
            }),
        );
    }

    public deleteUser(id: string): Observable<api.user.UserRes> {
        const findUser = this.userRepository.findOne({ id });

        return from(findUser).pipe(
            switchMap(user => {
                const deleteUser = this.userRepository.delete({ id: user.id });

                return from(deleteUser).pipe(
                    map(res => {
                        return {
                            status: USER_ACTION_SUCCESS,
                            message: `User delete successfully: ID: ${user.id}`,
                        };
                    }),
                    catchError(err => {
                        return throwError({
                            status: USER_ACTION_ERROR,
                            message: `Can\'t delete user: ${err}`,
                        });
                    }),
                );
            }),
        );
    }

    public getUser(id: string): Observable<api.user.User> {
        const findUser = this.userRepository.findOne({ id });

        return from(findUser).pipe(
            catchError(err => {
                return throwError({
                    status: USER_ACTION_ERROR,
                    message: `User not found: ${err}`,
                });
            }),
        );
    }
}
