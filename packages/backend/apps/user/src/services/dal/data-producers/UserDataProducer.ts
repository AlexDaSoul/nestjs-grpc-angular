import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { createHmac } from 'crypto';
import { from, Observable } from 'rxjs';
import { map, switchMap, mapTo } from 'rxjs/operators';

import { AlreadyExistsException, EMAIL_ALREADY_EXISTS } from '@lib/exceptions/impl';

import { api as userApi } from '@grpc-proto/user/user';
import { api as chatTypes } from '@grpc-proto/chat/chat.types';

import { UserDataFinder } from '@user/services/dal/data-finders/UserDataFinder';

import { SALT } from '@user/env';

@Injectable()
export class UserDataProducer {

    constructor(
        private readonly db: Client,
        private readonly userDataFinder: UserDataFinder,
    ) {
    }

    public createUser(data: userApi.user.CreateUserReq): Observable<void> {
        data.password = createHmac('sha512', SALT).update(data.password).digest('hex');

        const query = `insert into api_user (email, name, avatar, password) values ($1, $2, $3, $4)`;

        return this.checkEmailExistence(data.email).pipe(
            switchMap(() => from(this.db.query<chatTypes.chat.Message>(query,
                [data.email, data.name, data.avatar, data.password]))),
            mapTo(null),
        );
    }

    private checkEmailExistence(email: string): Observable<void> {
        return from(this.userDataFinder.getUserByConditions({ email } as userApi.user.VerifyUserReq)).pipe(
            map(user => {
                if (user) {
                    throw new AlreadyExistsException(EMAIL_ALREADY_EXISTS);
                }

                return null;
            }),
        );
    }
}
