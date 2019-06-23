import { Component } from '@angular/core';

import { ChatService } from '@grpc/services/chat/chat.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    constructor(private chatService: ChatService) {
        this.chatService.getMessagesStream()
            .subscribe(
                res => {
                    console.log(res);
                },
                err => console.error(err)
            );
    }

}
