import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { api } from '../../grpc-proto/todo/members';
import { Members } from '../../db/entities/members.entity';

@Injectable()
export class MembersService {

    constructor(
        @InjectRepository(Members)
        private readonly membersRepository: Repository<Members>,
    ) {
    }

    public addMembers(data: api.todo.AddMembersReq, userId: string): Observable<api.todo.Members> {
        const members = this.membersRepository.create({ ...data, userId });

        return from(this.membersRepository.save(members));
    }

    public updateMembers(data: api.todo.Members): Observable<void> {
        const findMembers = this.membersRepository.findOne(data);

        return from(findMembers).pipe(
            map(members => this.membersRepository.merge(members, data)),
            switchMap(members => from(this.membersRepository.save(members))),
            map(() => null),
        );
    }

    public deleteMembers(id: string): Observable<void> {
        const findUser = this.membersRepository.findOne({ id });

        return from(findUser).pipe(
            switchMap(members => from(this.membersRepository.remove([members]))),
            map(() => null),
        );
    }

    public getMembers(id: string): Observable<api.todo.Members> {
        return from(this.membersRepository.findOne(id));
    }
}
