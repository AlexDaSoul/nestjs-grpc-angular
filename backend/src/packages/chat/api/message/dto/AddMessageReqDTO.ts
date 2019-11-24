import { IsDefined, IsString, MaxLength } from 'class-validator';

import { SendMessageReq } from '../../../grpc-proto/chat/message_pb';

export class AddMessageReqDTO implements SendMessageReq.AsObject {
    @IsDefined()
    @IsString()
    @MaxLength(500)
    public message: string;
}
