import { IsUUID, IsDefined } from 'class-validator';

import { api } from '@grpc-proto/user/user';

export class UserReqDTO implements api.user.UserReq {
    @IsDefined()
    @IsUUID()
    public id: string;
}
