import { IsEmail, IsDefined, IsString, MaxLength } from 'class-validator';

import { api } from '@grpc-proto/user/user';

export class VerifyUserReqDTO implements api.user.VerifyUserReq {
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(128)
    public password: string;
}
