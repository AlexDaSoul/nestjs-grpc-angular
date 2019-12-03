import { IsUUID, IsDefined, IsString, MaxLength } from 'class-validator';

import { EditMessageReq } from '@grpc-proto/chat/message_pb';

export class EditMessageReqDTO implements EditMessageReq.AsObject {
    @IsDefined()
    @IsUUID()
    public id: string;

    @IsDefined()
    @IsString()
    @MaxLength(500)
    public message: string;
}
