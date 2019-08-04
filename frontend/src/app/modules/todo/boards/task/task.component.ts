import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Task } from '@grpc/proto/todo/todo.types_pb';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

    @Input('task') public task: Task.AsObject;

    constructor() {
    }

    ngOnInit() {
    }

}
