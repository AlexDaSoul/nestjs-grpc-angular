import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { api } from '../../grpc-proto/todo/board';
import { Board } from '../../db/entities/board.entity';

@Injectable()
export class BoardService {

    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {
    }

    public addBoard(data: api.todo.AddBoardReq, userId: string): Observable<api.todo.Board> {
        const board = this.boardRepository.create({ ...data, userId });

        return from(this.boardRepository.save(board));
    }

    public updateBoard(data: api.todo.Board): Observable<void> {
        const findBoard = this.boardRepository.findOne(data);

        return from(findBoard).pipe(
            map(board => this.boardRepository.merge(board, data)),
            switchMap(board => from(this.boardRepository.save(board))),
            map(() => null),
        );
    }

    public deleteBoard(id: string): Observable<void> {
        const findBoard = this.boardRepository.findOne({ id });

        return from(findBoard).pipe(
            switchMap(board => from(this.boardRepository.remove([board]))),
            map(() => null),
        );
    }

    public getBoard(id: string): Observable<api.todo.Board> {
        return from(this.boardRepository.findOne(id));
    }

    public getUserBoards(userId: string): Observable<api.todo.BoardsRes> {
        return from(this.boardRepository.find({ userId })).pipe(
            map(boards => ({ boards })),
        );
    }

    public getUserBoardsWithStatuses(userId: string): Observable<api.todo.BoardsRes> {
        const query = this.boardRepository
            .createQueryBuilder('board')
            .leftJoinAndSelect('board.statuses', 'status')
            .orderBy('status.index', 'ASC')
            .where({ userId })
            .getMany();

        return from(query).pipe(
            map(boards => ({ boards })),
        );
    }
}
