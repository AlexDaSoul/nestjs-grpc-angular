import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '@lib/jwt/JwtGuard';
import { IJwtMeta } from '@lib/jwt/JwtInterface';
import { RpcExceptionFilter } from '@lib/exceptions';

import { api as chatEnum } from '@grpc-proto/chat/chat.enum';
import { api as chatApi } from '@grpc-proto/chat/chat';

import { MessageService } from './MessageService';

import { AddMessageReqDTO } from './dto/AddMessageReqDTO';
import { EditMessageReqDTO } from './dto/EditMessageReqDTO';
import { DeleteMessageReqDTO } from './dto/DeleteMessageReqDTO';

@Controller()
export class MessageController {

    constructor(private readonly messageService: MessageService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MessageService', 'SendMessage')
    @UseFilters(RpcExceptionFilter.for('MessageService::sendMessage'))
    public sendMessage(data: AddMessageReqDTO, meta: IJwtMeta<{ id: string; }>): Observable<chatApi.chat.ChatRes> {
        return this.messageService.sendMessage(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: chatEnum.chat.EStatus.SUCCESS,
                    message: `Message created successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MessageService', 'EditMessage')
    @UseFilters(RpcExceptionFilter.for('MessageService::editMessage'))
    public editMessage(data: EditMessageReqDTO): Observable<chatApi.chat.ChatRes> {
        return this.messageService.editMessage(data).pipe(
            map(() => {
                return {
                    status: chatEnum.chat.EStatus.SUCCESS,
                    message: `Messages update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MessageService', 'DeleteMessage')
    @UseFilters(RpcExceptionFilter.for('MessageService::deleteMessage'))
    public deleteMessage(data: DeleteMessageReqDTO): Observable<chatApi.chat.ChatRes> {
        return this.messageService.deleteMessage(data.id).pipe(
            map(() => {
                return {
                    status: chatEnum.chat.EStatus.SUCCESS,
                    message: `Message delete successfully`,
                };
            }),
        );
    }
}
