import { Controller, UseGuards, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { JwtGuard } from '../lib/jwt/jwt.guard';
import { IJwtMeta } from '../lib/jwt/jwt.interface';
import { api } from '../grpc-proto/todo/board';

import { BoardService } from './board.service';
import { GrpcExceptionFilter } from '../lib/exceptions/exception.filter';

type Identity<T> = T;
const TODO_ACTION_SUCCESS = 1;

@Controller()
export class BoardController {

    constructor(private readonly boardService: BoardService) {
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('BoardService', 'AddBoard')
    @UseFilters(new GrpcExceptionFilter('BoardService::addBoard'))
    public addBoard(data: Identity<api.todo.AddBoardReq>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.TaskStatusRes> {
        return this.boardService.addBoard(data, meta.payload.id).pipe(
            map(res => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: res.id,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('BoardService', 'UpdateBoard')
    @UseFilters(new GrpcExceptionFilter('BoardService::updateBoard'))
    public updateBoard(data: Identity<api.todo.Board>): Observable<api.todo.TaskStatusRes> {
        return this.boardService.updateBoard(data).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Members update successfully`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('BoardService', 'DeleteBoard')
    @UseFilters(new GrpcExceptionFilter('BoardService::deleteBoard'))
    public deleteBoard(data: Identity<api.todo.BoardReq>): Observable<api.todo.TaskStatusRes> {
        return this.boardService.deleteBoard(data.id).pipe(
            map(() => {
                return {
                    status: TODO_ACTION_SUCCESS,
                    message: `Members delete successfully: ID: ${data.id}`,
                };
            }),
        );
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('BoardService', 'GetBoard')
    @UseFilters(new GrpcExceptionFilter('BoardService::getBoard'))
    public getBoard(data: Identity<api.todo.BoardReq>): Observable<api.todo.Board> {
        return this.boardService.getBoard(data.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('BoardService', 'GetUserBoards')
    @UseFilters(new GrpcExceptionFilter('BoardService::getUserBoards'))
    public getUserBoards(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.BoardsRes> {
        return this.boardService.getUserBoards(meta.payload.id);
    }

    @UseGuards(JwtGuard)
    @GrpcMethod('BoardService', 'GetUserBoardsWithStatuses')
    @UseFilters(new GrpcExceptionFilter('BoardService::getUserBoardsWithStatuses'))
    public getUserBoardsWithStatuses(data: Identity<api.todo.TodoStub>, meta: IJwtMeta<{ id: string; }>): Observable<api.todo.BoardsRes> {
        return this.boardService.getUserBoardsWithStatuses(meta.payload.id);
    }
}
