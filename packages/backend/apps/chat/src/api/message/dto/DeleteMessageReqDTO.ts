import { IsUUID, IsDefined } from 'class-validator';

import { api } from '@grpc-proto/chat/message';

export class DeleteMessageReqDTO implements api.chat.DeleteMessageReq {
    @IsDefined()
    @IsUUID()
    public id: string;
}
