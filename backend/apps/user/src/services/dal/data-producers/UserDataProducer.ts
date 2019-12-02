import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { createHmac } from 'crypto';
import { from, Observable } from 'rxjs';
import { map, switchMap, mapTo } from 'rxjs/operators';

import { AlreadyExistsException, EMAIL_ALREADY_EXISTS } from '@lib/exceptions/impl';

import { CreateUserReq, VerifyUserReq } from '@grpc-proto/user/user_pb';
import { Message } from '@grpc-proto/chat/chat.types_pb';

import { UserDataFinder } from '@user/services/dal/data-finders/UserDataFinder';

import { SALT } from '@user/env';

@Injectable()
export class UserDataProducer {

    constructor(
        private readonly db: Client,
        private readonly userDataFinder: UserDataFinder,
    ) {
    }

    public createUser(data: CreateUserReq.AsObject): Observable<void> {
        data.password = createHmac('sha512', SALT).update(data.password).digest('hex');

        const query = `insert into api_user (email, name, avatar, password) values ($1, $2, $3, $4)`;

        return this.checkEmailExistence(data.email).pipe(
            switchMap(() => from(this.db.query<Message.AsObject>(query,
                [data.email, data.name, data.avatar, data.password]))),
            mapTo(null),
        );
    }

    private checkEmailExistence(email: string): Observable<void> {
        return from(this.userDataFinder.getUserByConditions({ email } as VerifyUserReq.AsObject)).pipe(
            map(user => {
                if (user) {
                    throw new AlreadyExistsException(EMAIL_ALREADY_EXISTS);
                }

                return null;
            }),
        );
    }
}
