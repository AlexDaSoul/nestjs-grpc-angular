import { IsNumber, IsDefined, IsString, MaxLength } from 'class-validator';

import { AddStatusReq } from '../../../grpc-proto/todo/status_pb';

export class AddStatusReqDTO implements AddStatusReq.AsObject {
    @IsDefined()
    @IsString()
    @MaxLength(500)
    public name: string;

    @IsDefined()
    @IsNumber()
    index: number;
}
