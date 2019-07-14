import { Observable } from 'rxjs';
import { api } from '@grpc/todo/task';
export declare class Task implements api.todo.Task {
    private static updates$;
    id: string;
    userId: string;
    title: string;
    description: string;
    index: number;
    status: string;
    createdAt: number;
    updatedAt: number;
    updateTask(): void;
    static subscribe(): Observable<Task>;
}
