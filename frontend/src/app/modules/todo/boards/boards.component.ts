import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { TaskStatus } from '@grpc/proto/chat/chat.types_pb';

@Component({
    selector: 'app-boards',
    templateUrl: './boards.component.html',
    styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent {

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }
}
