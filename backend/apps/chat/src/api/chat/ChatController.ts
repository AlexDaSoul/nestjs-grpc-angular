import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { JwtGuard } from '@lib/jwt/jwt.guard';
import { RpcExceptionFilter } from '@lib/exceptions';

import { Message, Stub } from '@grpc-proto/chat/chat.types_pb';

import { ChatService } from './ChatService';

@Controller()
export class ChatController {

    constructor(private readonly chatService: ChatService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('ChatService', 'GetChat')
    @UseFilters(RpcExceptionFilter.for('ChatService::getChat'))
    public getChat(data: Stub.AsObject): Observable<{ messages: Message.AsObject[] }> {
        return this.chatService.getChatStream();
    }
}
