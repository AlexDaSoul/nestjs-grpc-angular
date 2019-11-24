import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { from, Observable } from 'rxjs';

import { MessageEntity } from '../db/entities/MessageEntity';

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

    public getChatStream(): Observable<MessageEntity[]> {
        return MessageEntity.subscribe();
    }
}
