import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '@share/share.module';
import { GrpcModule } from '@grpc/grpc.module';
import { RoutingModule } from './chat.routes';

import { ChatComponent } from './chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { MessageComponent } from './message/message.component';

@NgModule({
    declarations: [
        ChatComponent,
        ChatListComponent,
        MessageComponent,
    ],
    imports: [
        CommonModule,
        RoutingModule,
        ShareModule,
        GrpcModule,
    ],
})
export class ChatModule {
}
