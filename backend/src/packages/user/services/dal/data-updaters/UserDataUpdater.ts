import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { UserEntity } from '../db/entities/UserEntity';
import { UserDataFinder } from '../data-finders/UserDataFinder';

@Injectable()
export class UserDataUpdater {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userDataFinder: UserDataFinder,
    ) {
    }

    public updateUser(data: DeepPartial<UserEntity>): Observable<UserEntity> {
        return this.userDataFinder.getUserOne(data.id).pipe(
            map(user => this.userRepository.merge(user, data)),
            switchMap(user => from(this.userRepository.save(user))),
        );
    }
}
