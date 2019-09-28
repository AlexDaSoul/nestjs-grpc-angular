import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AlreadyExistsException, EMAIL_ALREADY_EXISTS } from '../../../lib/exceptions/impl';

import { UserDataFinder } from '../data-finders/UserDataFinder';
import { UserEntity } from '../db/entities/UserEntity';

@Injectable()
export class UserDataProducer {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userDataFinder: UserDataFinder,
    ) {
    }

    public createUser(data: DeepPartial<UserEntity>): Observable<UserEntity> {
        return this.checkEmailExistence(data.email).pipe(
            map(() => this.userRepository.create(data)),
            switchMap(user => from(this.userRepository.save(user))),
        );
    }

    private checkEmailExistence(email: string): Observable<void> {
        return from(this.userDataFinder.getUserByConditions({ email })).pipe(
            map(user => {
                if (user) {
                    throw new AlreadyExistsException(EMAIL_ALREADY_EXISTS);
                }

                return null;
            }),
        );
    }
}
