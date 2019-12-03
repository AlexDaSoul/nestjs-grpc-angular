import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export interface Message<T> {
    event: string;
    data: T;
}

@Injectable({
    providedIn: 'root',
})
export class MessageBusService<T> {

    private message$ = new Subject<Message<T>>();

    public emit(event: string, data: T): void {
        this.message$.next({ event, data });
    }

    public on(event: string): Observable<T> {
        return this.message$.pipe(
            filter(m => m.event === event),
            map(m => m.data),
        );
    }
}
