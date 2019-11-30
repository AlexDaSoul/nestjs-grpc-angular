import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NotFoundException, USER_NOT_FOUND } from '@lib/exceptions';

import { UserEntity } from '@user/services/dal/db/entities/UserEntity';

@Injectable()
export class UserDataFinder {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {
    }

    public getUserOne(id: string): Observable<UserEntity> {
        return from(this.userRepository.findOne(id))
            .pipe(
                map(user => {
                    if (!user) {
                        throw new NotFoundException(USER_NOT_FOUND);
                    }

                    return user;
                }),
            );
    }

    public getUserByConditions(conditions: FindConditions<UserEntity>): Observable<UserEntity> {
        return from(this.userRepository.findOne(conditions));
    }

    public getUsersByIds(ids: string[]): Observable<UserEntity[]> {
        return from(this.userRepository.findByIds(ids));
    }

    public getUsersAll(): Observable<UserEntity[]> {
        return from(this.userRepository.find());
    }
}
