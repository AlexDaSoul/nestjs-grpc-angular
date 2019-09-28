import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../grpc-proto/user/user.types_pb';
import { AuthReq } from '../grpc-proto/user/auth_pb';
import { CreateUserReq, UpdateUserReq } from '../grpc-proto/user/user_pb';

import { UnauthenticatedException, AUTH_CREDENTIALS_INVALID } from '../lib/exceptions';

import { UserDataFinder } from './dal/data-finders/UserDataFinder';
import { UserDataProducer } from './dal/data-producers/UserDataProducer';
import { UserDataRemover } from './dal/data-removers/UserDataRemover';
import { UserDataUpdater } from './dal/data-updaters/UserDataUpdater';

@Injectable()
export class UserService {

    constructor(
        private readonly userDataFinder: UserDataFinder,
        private readonly userDataProducer: UserDataProducer,
        private readonly userDataUpdater: UserDataUpdater,
        private readonly userDataRemover: UserDataRemover,
    ) {
    }

    public createUser(data: CreateUserReq.AsObject): Observable<User.AsObject> {
        return this.userDataProducer.createUser(data);
    }

    public updateUser(data: UpdateUserReq.AsObject, id: string): Observable<void> {
        return this.userDataUpdater.updateUser(data)
            .pipe(map(() => null));
    }

    public deleteUser(id: string): Observable<void> {
        return this.userDataRemover.deleteUser(id)
            .pipe(map(() => null));
    }

    public getUser(id: string): Observable<User.AsObject> {
        return this.userDataFinder.getUserOne(id);
    }

    public getUsersAll(): Observable<{ users: User.AsObject[] }> {
        return this.userDataFinder.getUsersAll().pipe(
            map(users => ({ users })),
        );
    }

    public verifyUser(data: AuthReq.AsObject): Observable<User.AsObject> {
        return this.userDataFinder.getUserByConditions({ ...data }).pipe(
            map(user => {
                if (!user) {
                    throw new UnauthenticatedException(AUTH_CREDENTIALS_INVALID);
                }

                return user;
            }),
        );
    }
}
