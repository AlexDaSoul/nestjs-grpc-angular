import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Message } from '@grpc/proto/chat/chat.types_pb';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
    @Input() public message: Message.AsObject;
}
