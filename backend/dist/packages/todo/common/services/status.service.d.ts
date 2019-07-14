import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { api } from '@grpc/todo/status';
import { TaskStatus } from '../../db/entities/status.entity';
export declare class StatusService {
    private readonly taskStatusRepository;
    constructor(taskStatusRepository: Repository<TaskStatus>);
    addStatus(data: api.todo.AddStatusReq, userId: string): Observable<api.todo.TaskStatus>;
    updateStatus(data: api.todo.StatusList): Observable<void>;
    deleteStatus(id: string): Observable<void>;
    getStatus(id: string): Observable<api.todo.TaskStatus>;
    getStatuses(userId: string): Observable<api.todo.TaskStatus[]>;
    getStatusesWithTasks(userId: string): Observable<api.todo.TaskStatus[]>;
}
