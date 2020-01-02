import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { api } from '@grpc-proto/chat/chat.types';

interface IInsertMessage {
    message: string;
    author: { id: string; name: string; avatar: string; };
}

@Injectable()
export class MessageDataProducer {

    constructor(private readonly db: Client) {
    }

    public sendMessage(data: IInsertMessage): Observable<api.chat.Message> {
        const author = JSON.stringify(data.author);
        const query = `insert into api_message (author, message) values ($1, $2) returning *`;

        return from(this.db.query<api.chat.Message>(query, [author, data.message]))
            .pipe(map(res => res.rows[0]));
    }
}
