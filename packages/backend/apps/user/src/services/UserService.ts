import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

import { api as userTypes } from '@grpc-proto/user/user.types';
import { api as userApi } from '@grpc-proto/user/user';

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

    public createUser(data: userApi.user.CreateUserReq): Observable<void> {
        return this.userDataProducer.createUser(data);
    }

    public updateUser(data: userApi.user.UpdateUserReq, id: string): Observable<void> {
        return this.userDataUpdater.updateUser(data, id)
            .pipe(mapTo(null));
    }

    public deleteUser(id: string): Observable<void> {
        return this.userDataRemover.deleteUser(id)
            .pipe(mapTo(null));
    }

    public getUser(id: string): Observable<userTypes.user.User> {
        return this.userDataFinder.getUserOne(id);
    }

    public getUsersAll(): Observable<{ users: userTypes.user.User[] }> {
        return this.userDataFinder.getUsersAll().pipe(
            map(users => ({users})),
        );
    }

    public verifyUser(data: userApi.user.VerifyUserReq): Observable<userTypes.user.User> {
        return this.userDataFinder.getUserByConditions({...data});
    }
}
