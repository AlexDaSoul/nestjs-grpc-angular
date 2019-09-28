import { IsDefined, IsString, MaxLength } from 'class-validator';

import { AddTaskReq } from '../../../grpc-proto/todo/task_pb';

export class AddTaskReqDTO implements AddTaskReq.AsObject {
    @IsDefined()
    @IsString()
    @MaxLength(500)
    public title: string;

    @IsDefined()
    @IsString()
    @MaxLength(1000)
    public description: string;
}
