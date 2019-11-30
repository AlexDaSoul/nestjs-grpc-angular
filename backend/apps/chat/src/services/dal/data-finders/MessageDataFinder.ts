import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable, concat } from 'rxjs';

import { MessageEntity } from '@chat/services/dal/db/entities/MessageEntity';

@Injectable()
export class MessageDataFinder {

    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
    ) {
    }

    public getMessageOne(id: string): Observable<MessageEntity> {
        return from(this.messageRepository.findOne(id));
    }

    public getMessageAll(): Observable<MessageEntity[]> {
        return from(this.messageRepository.find({
            order: {
                createdAt: 'ASC',
            },
        }));
    }

    public getChatStream(): Observable<MessageEntity[]> {
        return concat(this.getMessageAll(), MessageEntity.subscribe());
    }
}
