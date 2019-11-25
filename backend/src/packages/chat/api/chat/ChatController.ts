import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { JwtGuard } from '../../lib/jwt/jwt.guard';
import { RpcExceptionFilter } from '../../lib/exceptions';

import { Stub } from '../../grpc-proto/chat/chat.types_pb';
import { ChatList } from '../../grpc-proto/chat/chat_pb';

import { ChatService } from './ChatService';

@Controller()
export class ChatController {

    constructor(private readonly chatService: ChatService) {
    }

    @UseGuards(JwtGuard)
    @GrpcStreamMethod('ChatService', 'GetChat')
    @UseFilters(RpcExceptionFilter.for('ChatService::getChat'))
    public getChat(data: Stub.AsObject): Observable<ChatList.AsObject> {
        return this.chatService.getChatStream();
    }
}
