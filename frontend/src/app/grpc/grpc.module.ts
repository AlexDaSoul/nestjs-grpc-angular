import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from '@environments/environment';

import { UserServicePromiseClient } from '@grpc/proto/user/user_grpc_web_pb';
import { AuthServicePromiseClient } from '@grpc/proto/user/auth_grpc_web_pb';
import { TodoServicePromiseClient } from '@grpc/proto/todo/todo_grpc_web_pb';

const GRPC_CLIENTS = [
    UserServicePromiseClient,
    AuthServicePromiseClient,
    TodoServicePromiseClient
];

@NgModule({
    imports: [
        CommonModule
    ],
    providers: GRPC_CLIENTS.map(service => {
        return {
            provide: service,
            useFactory: () => new service(environment.url, null, null)
        };
    })
})
export class GrpcModule {
}
