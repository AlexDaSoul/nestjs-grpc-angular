import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { api } from '@grpc/todo/task';
import { TaskStatus } from '../../db/entities/status.entity';
import { Task } from '../../db/entities/task.entity';
export declare class TaskService {
    private readonly taskRepository;
    private readonly taskStatusRepository;
    constructor(taskRepository: Repository<Task>, taskStatusRepository: Repository<TaskStatus>);
    private getIndexTask;
    addTask(data: api.todo.AddTaskReq, userId: string): Observable<api.todo.Task>;
    updateTask(data: api.todo.Task): Observable<void>;
    deleteTask(id: string): Observable<void>;
    getTask(id: string): Observable<api.todo.Task>;
    getTasksByUserId(userId: string): Observable<api.todo.Task[]>;
    getTasksStream(userId: string): Observable<api.todo.Task>;
}
