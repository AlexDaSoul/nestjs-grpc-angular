import { Observable } from 'rxjs';
import { IJwtMeta } from '@lib/jwt/jwt.interface';
import { api } from '@grpc/todo/task';
import { TaskService } from '../common/services/task.service';
declare type Identity<T> = T;
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    addTask(data: Identity<api.todo.AddTaskReq>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.todo.TaskStatusRes>;
    updateTask(data: Identity<api.todo.Task>): Observable<api.todo.TaskStatusRes>;
    deleteTask(data: Identity<api.todo.TaskReq>): Observable<api.todo.TaskStatusRes>;
    getTask(data: Identity<api.todo.TaskReq>): Observable<api.todo.Task>;
    getTasksByUserId(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.todo.TaskListRes>;
    getTasksStream(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.todo.Task>;
}
export {};
