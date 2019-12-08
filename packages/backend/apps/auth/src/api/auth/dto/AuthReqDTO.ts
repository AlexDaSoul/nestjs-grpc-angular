import { IsEmail, IsDefined, IsString, MaxLength } from 'class-validator';

import { api } from '@grpc-proto/auth/auth';

export class AuthReqDTO implements api.auth.AuthReq {
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(128)
    public password: string;
}
