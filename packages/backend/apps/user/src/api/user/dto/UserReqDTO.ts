import { IsUUID, IsDefined } from 'class-validator';

import { UserReq } from '@grpc-proto/user/user_pb';

export class UserReqDTO implements UserReq.AsObject {
    @IsDefined()
    @IsUUID()
    public id: string;
}
