import { IsUUID, IsDefined, IsString, MaxLength } from 'class-validator';

import { api } from '@grpc-proto/chat/message';

export class EditMessageReqDTO implements api.chat.EditMessageReq {
    @IsDefined()
    @IsUUID()
    public id: string;

    @IsDefined()
    @IsString()
    @MaxLength(500)
    public message: string;
}
