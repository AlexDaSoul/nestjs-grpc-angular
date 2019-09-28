import { IsDefined, IsArray, ArrayMinSize } from 'class-validator';

import { Task } from '../../../grpc-proto/todo/todo.types_pb';
import { TaskList } from '../../../grpc-proto/todo/task_pb';

export class TaskListDTO implements TaskList.AsObject {
    @IsDefined()
    @IsArray()
    @ArrayMinSize(1)
    public tasksList: Task.AsObject[];
}
