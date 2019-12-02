import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Message } from '@grpc-proto/chat/chat.types_pb';

@Injectable()
export class MessageDataFinder {

    constructor(private readonly db: Client) {
    }

    public getMessageOne(id: string): Observable<Message.AsObject> {
        const query = `select * from api_message where id = $1`;

        return from(this.db.query<Message.AsObject>(query, [id]))
            .pipe(map(res => res.rows[0]));
    }

    public getMessageAll(): Observable<Message.AsObject[]> {
        const query = `select * from api_message order by "updatedAt" ASC`;

        return from(this.db.query<Message.AsObject>(query))
            .pipe(map(res => res.rows));
    }
}
