import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ChatGrpcService } from '@grpc/services/chat/chat.service';
import { MessageGrpcService } from '@grpc/services/chat/message.service';
import { Message } from '@grpc/proto/chat/chat.types_pb';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComponent implements OnInit {

    public messages: Observable<Message.AsObject[]> = this.chatGrpcService.getChat()
        .pipe(map(res => res.messagesList));

    constructor(
        private chatGrpcService: ChatGrpcService,
        private messageGrpcService: MessageGrpcService,
        private snackBar: MatSnackBar,
        ) {
    }

    ngOnInit() {
    }

    public onSend(message: string): void {
        if (message) {
            this.messageGrpcService.sendMessage({ message })
                .subscribe(
                    res => {
                        this.snackBar.open(res.message, 'close', {
                            duration: 5000,
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            panelClass: 'success-message',
                        });
                    },
                    err => {
                        this.snackBar.open(err.message, 'close', {
                            duration: 5000,
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                            panelClass: 'error-message',
                        });
                    });
        }
    }
}
