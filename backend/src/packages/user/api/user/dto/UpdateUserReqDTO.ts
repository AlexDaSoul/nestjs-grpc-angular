import { IsEmail, IsDefined, IsString, MaxLength } from 'class-validator';

import { UpdateUserReq } from '../../../grpc-proto/user/user_pb';

export class UpdateUserReqDTO implements UpdateUserReq.AsObject {
    @IsDefined()
    @IsEmail()
    @MaxLength(50)
    public email: string;

    @IsDefined()
    @IsString()
    @MaxLength(50)
    public name: string;

    @IsString()
    @MaxLength(500)
    public avatar: string;
}
