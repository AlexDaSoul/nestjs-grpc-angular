import { api } from '@grpc/todo/status';
import { Task } from './task.entity';
export declare class TaskStatus implements api.todo.TaskStatus {
    id: string;
    userId: string;
    root: boolean;
    index: number;
    name: string;
    tasks: Task[];
    createdAt: number;
    updatedAt: number;
}
