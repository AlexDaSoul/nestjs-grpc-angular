import { IsUUID, IsDefined } from 'class-validator';

import { TaskReq } from '../../../grpc-proto/todo/task_pb';

export class TaskReqDTO implements TaskReq.AsObject {
    @IsDefined()
    @IsUUID()
    public id: string;
}
