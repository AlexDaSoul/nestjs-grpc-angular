import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { UserDataFinder } from '@user/services/dal/data-finders/UserDataFinder';
import { UserEntity } from '@user/services/dal/db/entities/UserEntity';

@Injectable()
export class UserDataRemover {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userDataFinder: UserDataFinder,
    ) {
    }

    public deleteUser(id: string): Observable<UserEntity[]> {
        return this.userDataFinder.getUserOne(id).pipe(
            switchMap(user => from(this.userRepository.remove([user]))),
        );
    }
}
