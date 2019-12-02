import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { from, Observable } from 'rxjs';
import { switchMap, mapTo } from 'rxjs/operators';

import { User } from '@grpc-proto/user/user.types_pb';

import { UserDataFinder } from '@user/services/dal/data-finders/UserDataFinder';

@Injectable()
export class UserDataRemover {

    constructor(
        private readonly db: Client,
        private readonly userDataFinder: UserDataFinder,
    ) {
    }

    public deleteUser(id: string): Observable<void> {
        const query = `delete from api_user where id = $1`;

        return this.userDataFinder.getUserOne(id).pipe(
            switchMap(() => from(this.db.query<User.AsObject>(query, [id]))),
            mapTo(null),
        );
    }
}
