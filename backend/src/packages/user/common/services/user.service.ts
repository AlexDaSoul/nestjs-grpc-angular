import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

import { api } from '../../grpc-proto/user';
import { User } from '../entities/user.entity';

type IUser = api.user.IUser;
type ICreateUserReq = api.user.ICreateUserReq;
type IUserReq = api.user.IUserReq;
type IUserRes = api.user.IUserRes;

const USER_ACTION_SUCCESS = 1;
const USER_ACTION_ERROR = 2;

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    public createUser(data: ICreateUserReq): Observable<IUserRes> {
        const createUser = this.userRepository.create({ ...data });

        return from(this.userRepository.save(createUser)).pipe(
            map(res => {
                return {
                    status: USER_ACTION_SUCCESS,
                    message: `User created successfully: ID:${res}`,
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

    public updateUser(data: IUser): Observable<IUserRes> {
        const findUser = this.userRepository.findOne(data);

        return from(findUser).pipe(
            switchMap(user => {
                const updateUser = this.userRepository.update(user, data);

                return from(updateUser).pipe(
                    map(res => {
                        return {
                            status: USER_ACTION_SUCCESS,
                            message: `User update successfully: ID:${res}`,
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
            catchError(err => {
                return throwError({
                    status: USER_ACTION_ERROR,
                    message: `User not found: ${err}`,
                });
            }),
        );
    }

    public deleteUser(data: IUserReq): Observable<IUserRes> {
        const findUser = this.userRepository.findOne(data);

        return from(findUser).pipe(
            switchMap(user => {
                const deleteUser = this.userRepository.delete(user);

                return from(deleteUser).pipe(
                    map(res => {
                        return {
                            status: USER_ACTION_SUCCESS,
                            message: `User delete successfully: ID:${res}`,
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
            catchError(err => {
                return throwError({
                    status: USER_ACTION_ERROR,
                    message: `User not found: ${err}`,
                });
            }),
        );
    }

    public getUser(data: IUserReq): Observable<IUser> {
        const findUser = this.userRepository.findOne(data);

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
