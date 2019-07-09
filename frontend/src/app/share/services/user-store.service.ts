import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '@grpc/proto/user/user.types_pb';

@Injectable({
    providedIn: 'root',
})
export class UserStoreService {

    private user$ = new BehaviorSubject<User.AsObject>(null);

    public setUser(user: User.AsObject): void {
        this.user$.next(user);
    }

    public getUser(): Observable<User.AsObject> {
        return this.user$.asObservable();
    }
}
