import { Controller, UseGuards, Logger } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Observable, interval } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { status } from 'grpc';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IUserMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/chat/chat';

import { UserService } from '../common/services/user.service';

type Identity<T> = T;

@Controller()
export class MessageController {
    private readonly logger = new Logger('MessageController');

    constructor(private readonly userService: UserService) {
    }

   // @UseGuards(JwtGuard)
    @GrpcMethod('ChatService', 'AddMessage')
    public addMessage(data: Identity<api.chat.IMessageRes>, meta: IUserMeta): Identity<api.chat.IMessageStatusRes> {
        return {
            status: 2,
        };
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('ChatService', 'DeleteMessage')
    public deleteMessage(data: Identity<api.chat.IDeleteMessageReq>, meta: IUserMeta): Observable<api.chat.IMessageStatusRes> {
        return this.userService.createUser(data).pipe(
            catchError(err => {
                const msg = `DeleteMessage: ${err}`;
                this.logger.error(msg);
                throw new RpcException({code: status.INTERNAL, message: msg});
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('ChatService', 'UpdateMessage')
    public updateMessage(data: Identity<api.chat.IMessageRes>, meta: IUserMeta): Observable<api.chat.IMessageStatusRes> {
        return this.userService.createUser(data).pipe(
            catchError(err => {
                const msg = `UpdateMessage: ${err}`;
                this.logger.error(msg);
                throw new RpcException({code: status.INTERNAL, message: msg});
            }),
        );
    }

    @GrpcMethod('ChatService', 'GetMessagesStream')
    public getMessagesStream(data: Identity<api.chat.IChatStub>): Observable<api.chat.IMessageList> {
        return interval(1000).pipe(
            map(() => {
                return {
                    messages: [
                        {
                            id: 'id',
                            user: 'user',
                            message: 'message',
                        },
                    ],
                };
            }),
        );
    }

}
