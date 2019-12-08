import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { JwtGuard } from '@lib/jwt/JwtGuard';
import { RpcExceptionFilter } from '@lib/exceptions';
import { Identity } from '@lib/utils/identity';

import { api as chatApiTypes } from '@grpc-proto/chat/chat.types';
import { api as chatApi } from '@grpc-proto/chat/chat';

import { ChatService } from './ChatService';

@Controller()
export class ChatController {

    constructor(private readonly chatService: ChatService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('ChatService', 'GetChat')
    @UseFilters(RpcExceptionFilter.for('ChatService::getChat'))
    public getChat(data: Identity<chatApiTypes.chat.Stub>): Observable<chatApi.chat.ChatList> {
        return this.chatService.getChatStream();
    }
}
