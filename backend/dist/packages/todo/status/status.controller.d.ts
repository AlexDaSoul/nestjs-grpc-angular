import { Observable } from 'rxjs';
import { IJwtMeta } from '@lib/jwt/jwt.interface';
import { api } from '@grpc/todo/status';
import { StatusService } from '../common/services/status.service';
declare type Identity<T> = T;
export declare class StatusController {
    private readonly statusService;
    constructor(statusService: StatusService);
    addStatus(data: Identity<api.todo.AddStatusReq>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.todo.TaskStatusRes>;
    updateStatus(data: Identity<api.todo.StatusList>): Observable<api.todo.TaskStatusRes>;
    deleteStatus(data: Identity<api.todo.StatusReq>): Observable<api.todo.TaskStatusRes>;
    getStatus(data: Identity<api.todo.StatusReq>): Observable<api.todo.TaskStatus>;
    getStatuses(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.todo.StatusList>;
    getStatusesWithTasks(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{
        id: string;
    }>): Observable<api.todo.StatusList>;
}
export {};
