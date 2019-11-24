import { Module } from '@nestjs/common';

import { ChatModule } from './chat/ChatModule';
import { MessageModule } from './message/MessageModule';

@Module({
    imports: [ChatModule, MessageModule],
    exports: [ChatModule, MessageModule],
})
export class ApiModule {
}
