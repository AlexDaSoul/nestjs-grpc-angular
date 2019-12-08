import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { api as userTypes } from '@grpc-proto/user/user.types';
import { api as userApi } from '@grpc-proto/user/user';

import { UserDataFinder } from '@user/services/dal/data-finders/UserDataFinder';

@Injectable()
export class UserDataUpdater {

    constructor(
        private readonly db: Client,
        private readonly userDataFinder: UserDataFinder,
    ) {
    }

    public updateUser(data: userApi.user.UpdateUserReq, id: string): Observable<userTypes.user.User> {
        const query = `update api_user set name = $1, email = $2, avatar = $3 where id = $4`;

        return from(this.userDataFinder.getUserOne(id)).pipe(
            switchMap(() => from(this.db.query<userTypes.user.User>(query,
                [data.name, data.email, data.avatar, id]))),
            map(res => res.rows[0]),
        );
    }
}
