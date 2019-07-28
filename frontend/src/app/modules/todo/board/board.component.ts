import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BoardService } from '@grpc/services/todo/board.service';
import { Board } from '@grpc/proto/todo/todo.types_pb';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

    public boards$: Observable<Board.AsObject[]> = this.boardService.getUserBoardsWithStatuses().pipe(
        map(data => data.boardsList),
    );

    constructor(
        private boardService: BoardService,
    ) {
    }
}
