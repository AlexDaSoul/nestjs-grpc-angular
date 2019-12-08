import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { mapTo, switchMap, tap } from 'rxjs/operators';

import { grpcUser } from '@lib/utils/GrpcConfigs';

import { api as chatApi } from '@grpc-proto/chat/message';
import { api as userApi } from '@grpc-proto/user/user';

import { MessageDataProducer } from '@chat/services/dal/data-producers/MessageDataProducer';
import { MessageDataRemover } from '@chat/services/dal/data-removers/MessageDataRemover';
import { MessageDataUpdater } from '@chat/services/dal/data-updaters/MessageDataUpdater';
import { ChatEventService } from '@chat/services/ChatEventService';

@Injectable()
export class MessageService implements OnModuleInit {

    @Client(grpcUser) private readonly grpcUserClient: ClientGrpc;
    private grpcUserService: userApi.user.UserService;

    constructor(
        private readonly messageDataProducer: MessageDataProducer,
        private readonly messageDataUpdater: MessageDataUpdater,
        private readonly messageDataRemover: MessageDataRemover,
        private readonly chatEventService: ChatEventService,
    ) {
    }

    onModuleInit() {
        this.grpcUserService = this.grpcUserClient.getService<userApi.user.UserService>('UserService');
    }

    public sendMessage(data: chatApi.chat.SendMessageReq, userId: string): Observable<void> {
        return this.grpcUserService.getUser({id: userId})
            .pipe(
                switchMap(user => this.messageDataProducer.sendMessage({
                    message: data.message,
                    author: {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                    },
                })),
                tap(res => this.chatEventService.emit(res)),
                mapTo(null),
            );
    }

    public editMessage(data: chatApi.chat.EditMessageReq): Observable<void> {
        return this.messageDataUpdater.updateMessage(data)
            .pipe(mapTo(null));
    }

    public deleteMessage(id: string): Observable<void> {
        return this.messageDataRemover.deleteMessage(id)
            .pipe(mapTo(null));
    }
}
