import { IsEmail, IsDefined, IsString, MaxLength, ValidateIf } from 'class-validator';

import { api } from '@grpc-proto/user/user';

export class CreateUserReqDTO implements api.user.CreateUserReq {
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

    @ValidateIf(user => user.avatar)
    @IsString()
    @MaxLength(500)
    public avatar: string;
}
