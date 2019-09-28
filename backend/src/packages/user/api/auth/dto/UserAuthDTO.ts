import { IsEmail, IsDefined, IsString, MaxLength } from 'class-validator';

import { AuthReq } from '../../../grpc-proto/user/auth_pb';

export class UserAuthDTO implements AuthReq.AsObject {
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(128)
    public password: string;
}
