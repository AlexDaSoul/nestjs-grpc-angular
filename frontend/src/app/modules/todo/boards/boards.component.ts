import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

import { Board, TaskStatus } from '@grpc/proto/todo/todo.types_pb';
import { BoardService } from '@grpc/services/todo/board.service';

interface ITodoTask {
    id: string;
    title: string;
    description: string;
    statusId: string;
}

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {

    public boards$: Observable<Board.AsObject[]> = combineLatest(
        [
            this.boardService.getUserBoards(),
            this.route.params,
        ],
    ).pipe(
        map(([data, routeParams]) => [data.boardsList, routeParams]),
        filter(([boards]) => boards.length > 0),
        tap(([boards, routeParams]) => {
            if(!routeParams.id) {
                this.router.navigate([boards[0].id], {
                    relativeTo: this.route
                })
            }
        }),
        map((data: Array<Board.AsObject[]>) => data[0]),
    );

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private boardService: BoardService,
    ) {
    }
}
