import { IsDefined, IsArray, ArrayMinSize } from 'class-validator';

import { TaskStatus } from '../../../grpc-proto/todo/todo.types_pb';
import { StatusList } from '../../../grpc-proto/todo/status_pb';

export class StatusListDTO implements StatusList.AsObject {
    @IsDefined()
    @IsArray()
    @ArrayMinSize(1)
    public statusesList: TaskStatus.AsObject[];
}
