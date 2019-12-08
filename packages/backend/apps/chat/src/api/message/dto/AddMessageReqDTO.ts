import { IsDefined, IsString, MaxLength } from 'class-validator';

import { api } from '@grpc-proto/chat/message';

export class AddMessageReqDTO implements api.chat.SendMessageReq {
    @IsDefined()
    @IsString()
    @MaxLength(500)
    public message: string;
}
