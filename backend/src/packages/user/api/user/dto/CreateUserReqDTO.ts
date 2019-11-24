import { IsEmail, IsDefined, IsString, MaxLength } from 'class-validator';

import { CreateUserReq } from '../../../grpc-proto/user/user_pb';

export class CreateUserReqDTO implements CreateUserReq.AsObject {
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(50)
    public name: string;

    @IsDefined()
    @IsString()
    @MaxLength(128)
    public password: string;

    @IsString()
    @MaxLength(500)
    public avatar: string;
}
