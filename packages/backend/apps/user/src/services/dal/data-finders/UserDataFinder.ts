import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { createHmac } from 'crypto';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NotFoundException, USER_NOT_FOUND } from '@lib/exceptions';

import { api as userTypes } from '@grpc-proto/user/user.types';
import { api as userApi } from '@grpc-proto/user/user';

import { SALT } from '@user/env';

@Injectable()
export class UserDataFinder {

    constructor(private readonly db: Client) {
    }

    private getConditionQuery(data: userApi.user.VerifyUserReq): string {
        if (data.password) {
            data.password = createHmac('sha512', SALT).update(data.password).digest('hex');
        }

        const keys = Object.keys(data);
        const conditions = keys.map((key, index) => {
            const and = keys.length > 1 && index < keys.length - 1 ? ' and ' : '';
            return `${key}='${data[key]}'${and}`;
        }).join('');

        return `select * from api_user where ${conditions}`;
    }

    public getUserOne(id: string): Observable<userTypes.user.User> {
        const query = `select * from api_user where id = $1`;

        return from(this.db.query<userTypes.user.User>(query, [id]))
            .pipe(
                map(res => {
                    if (!res.rowCount) {
                        throw new NotFoundException(USER_NOT_FOUND);
                    }

                    return res.rows[0];
                }),
            );
    }

    public getUserByConditions(data: userApi.user.VerifyUserReq): Observable<userTypes.user.User> {
        const query = this.getConditionQuery(data);

        return from(this.db.query<userTypes.user.User>(query))
            .pipe(map(res => res.rows[0]));
    }

    public getUsersByIds(ids: string[]): Observable<userTypes.user.User[]> {
        let query = `select * from api_user where id in (`;
        ids.forEach((id, index) => {
            const end = index === ids.length - 1 ? `)` : `,`;
            query += `'${id}'${end}`;
        });

        return from(this.db.query<userTypes.user.User>(query))
            .pipe(map(res => res.rows));
    }

    public getUsersAll(): Observable<userTypes.user.User[]> {
        const query = `select * from api_user`;

        return from(this.db.query<userTypes.user.User>(query))
            .pipe(map(res => res.rows));
    }
}
