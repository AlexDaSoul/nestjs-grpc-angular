import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '@lib/jwt/JwtGuard';
import { IJwtMeta } from '@lib/jwt/JwtInterface';
import { RpcExceptionFilter } from '@lib/exceptions';

import { EStatus, ChatRes } from '@grpc-proto/chat/chat.types_pb';

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
    public sendMessage(data: AddMessageReqDTO, meta: IJwtMeta<{ id: string; }>): Observable<ChatRes.AsObject> {
        return this.messageService.sendMessage(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: EStatus.SUCCESS,
                    message: `Message created successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MessageService', 'EditMessage')
    @UseFilters(RpcExceptionFilter.for('MessageService::editMessage'))
    public editMessage(data: EditMessageReqDTO): Observable<ChatRes.AsObject> {
        return this.messageService.editMessage(data).pipe(
            map(() => {
                return {
                    status: EStatus.SUCCESS,
                    message: `Messages update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('MessageService', 'DeleteMessage')
    @UseFilters(RpcExceptionFilter.for('MessageService::deleteMessage'))
    public deleteMessage(data: DeleteMessageReqDTO): Observable<ChatRes.AsObject> {
        return this.messageService.deleteMessage(data.id).pipe(
            map(() => {
                return {
                    status: EStatus.SUCCESS,
                    message: `Message delete successfully`,
                };
            }),
        );
    }
}
