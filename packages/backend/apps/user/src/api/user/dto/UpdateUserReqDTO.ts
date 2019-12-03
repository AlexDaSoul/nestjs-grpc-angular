import { IsEmail, IsDefined, IsString, MaxLength, ValidateIf } from 'class-validator';

import { UpdateUserReq } from '@grpc-proto/user/user_pb';

export class UpdateUserReqDTO implements UpdateUserReq.AsObject {
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(50)
    public name: string;

    @ValidateIf(user => user.avatar)
    @IsString()
    @MaxLength(500)
    public avatar: string;
}
