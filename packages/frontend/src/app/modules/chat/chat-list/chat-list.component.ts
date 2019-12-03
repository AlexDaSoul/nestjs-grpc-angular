import { Component, ChangeDetectionStrategy, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

import { getUserIdFromJWT } from '@grpc/helpers/grpc-get-id';
import { Message } from '@grpc/proto/chat/chat.types_pb';
import { AuthService } from '@share/services/auth.service';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatListComponent implements OnChanges {

    @ViewChild(CdkVirtualScrollViewport, { static: true })
    private viewport: CdkVirtualScrollViewport;

    @Input() public newMessages: Message.AsObject[];

    public messages: Message.AsObject[] = [];
    public userId: string = getUserIdFromJWT(this.authService.getToken());
    public itemSize = 30;

    constructor(private authService: AuthService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.newMessages && Array.isArray(changes.newMessages.currentValue)) {
            this.messages = [...this.messages, ...changes.newMessages.currentValue];

            setTimeout(() => {
                // TODO: trash
                this.viewport.scrollToIndex(this.messages.length * 100);
            }, 100);
        }
    }
}
