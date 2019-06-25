import { Component } from '@angular/core';

import { TodoService } from '@grpc/services/todo/todo.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    constructor(private todoService: TodoService) {
        this.todoService.getMessagesStream()
            .subscribe(
                res => {
                    console.log(res);
                },
                err => console.error(err)
            );
    }

}
