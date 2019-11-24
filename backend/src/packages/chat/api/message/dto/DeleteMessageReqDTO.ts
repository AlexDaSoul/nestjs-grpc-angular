import { IsUUID, IsDefined } from 'class-validator';

import { DeleteMessageReq } from '../../../grpc-proto/chat/message_pb';

export class DeleteMessageReqDTO implements DeleteMessageReq.AsObject {
    @IsDefined()
    @IsUUID()
    public id: string;
}
