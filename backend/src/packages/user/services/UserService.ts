import { Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../grpc-proto/user/user.types_pb';
import { CreateUserReq, UpdateUserReq, VerifyUserReq } from '../grpc-proto/user/user_pb';

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

    public verifyUser(data: VerifyUserReq.AsObject): Observable<User.AsObject> {
        return this.userDataFinder.getUserByConditions({ ...data });
    }
}
