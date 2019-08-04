import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BoardService } from '@grpc/services/todo/board.service';
import { Board } from '@grpc/proto/todo/todo.types_pb';

@Component({
    selector: 'app-boards-settings',
    templateUrl: './boards-settings.component.html',
    styleUrls: ['./boards-settings.component.scss'],
})
export class BoardsSettingsComponent {

    public boards$: Observable<Board.AsObject[]> = this.boardService.getUserBoardsWithStatuses().pipe(
        map(data => data.boardsList),
    );

    constructor(
        private boardService: BoardService,
    ) {
    }
}
