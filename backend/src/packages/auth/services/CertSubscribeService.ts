import { Injectable } from '@nestjs/common';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class CertSubscribeService {
    private readonly publicKey = new ReplaySubject<string>(1);

    public getCert(): Observable<string> {
        return this.publicKey.asObservable();
    }

    public setCert(key: string): void {
        this.publicKey.next(key);
    }
}
