import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@environments/environment';

import { UserServicePromiseClient } from '@grpc/proto/user/user_grpc_web_pb';
import { AuthServicePromiseClient } from '@grpc/proto/auth/auth_grpc_web_pb';
import { ChatServicePromiseClient } from '@grpc/proto/chat/chat_grpc_web_pb';
import { MessageServicePromiseClient } from '@grpc/proto/chat/message_grpc_web_pb';

const GRPC_CLIENTS = [
    UserServicePromiseClient,
    AuthServicePromiseClient,
    ChatServicePromiseClient,
    MessageServicePromiseClient,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    providers: GRPC_CLIENTS.map(service => {
        return {
            provide: service,
            useFactory: () => new service(environment.url, null, null),
        };
    }),
})
export class GrpcModule {
}
