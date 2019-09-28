import { IsUUID, IsDefined } from 'class-validator';

import { StatusReq } from '../../../grpc-proto/todo/status_pb';

export class StatusReqDTO implements StatusReq.AsObject {
    @IsDefined()
    @IsUUID()
    public id: string;
}
