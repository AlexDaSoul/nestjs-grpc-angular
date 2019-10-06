import { IsEmail, IsDefined, IsString, MaxLength } from 'class-validator';

import { VerifyUserReq } from '../../../grpc-proto/user/user_pb';

export class VerifyUserReqDTO implements VerifyUserReq.AsObject {
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(128)
    public password: string;
}
