import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { from, Observable } from 'rxjs';

import { MessageEntity } from '../db/entities/MessageEntity';

@Injectable()
export class MessageDataProducer {

    constructor(
        @InjectRepository(MessageEntity)
        private readonly messageRepository: Repository<MessageEntity>,
    ) {
    }

    public sendMessage(data: DeepPartial<MessageEntity>): Observable<MessageEntity> {
        const message = this.messageRepository.create(data);

        return from(this.messageRepository.save(message));
    }
}
