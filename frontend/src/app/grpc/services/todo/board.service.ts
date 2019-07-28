import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Metadata } from 'grpc-web';

import { grpcUnary } from '@grpc/helpers/grpc-unary';
import { grpcJwtMetadata } from '@grpc/helpers/grpc-metadata';
import { BoardServicePromiseClient } from '@grpc/proto/todo/board_grpc_web_pb';
import { TaskStatusRes, Board, TodoStub } from '@grpc/proto/todo/todo.types_pb';
import { AddBoardReq, BoardReq, BoardsRes } from '@grpc/proto/todo/board_pb';

@Injectable({
    providedIn: 'root',
})
export class BoardService {

    constructor(private client: BoardServicePromiseClient) {
    }

    public addBoard(data: AddBoardReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new AddBoardReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setMembersList(data.membersList);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.addBoard(req, meta));
    }

    public updateBoard(data: Board.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new Board();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);
        req.setMembersList(data.membersList);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.updateBoard(req, meta));
    }

    public deleteBoard(data: BoardReq.AsObject): Observable<TaskStatusRes.AsObject> {
        const req = new BoardReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<TaskStatusRes.AsObject>(this.client.deleteBoard(req, meta));
    }

    public getBoard(data: BoardReq.AsObject): Observable<Board.AsObject> {
        const req = new BoardReq();
        const meta: Metadata = grpcJwtMetadata();

        req.setId(data.id);

        return grpcUnary<Board.AsObject>(this.client.getBoard(req, meta));
    }

    public getUserBoards(): Observable<BoardsRes.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<BoardsRes.AsObject>(this.client.getUserBoards(req, meta));
    }

    public getUserBoardsWithStatuses(): Observable<BoardsRes.AsObject> {
        const req = new TodoStub();
        const meta: Metadata = grpcJwtMetadata();

        return grpcUnary<BoardsRes.AsObject>(this.client.getUserBoardsWithStatuses(req, meta));
    }
}
