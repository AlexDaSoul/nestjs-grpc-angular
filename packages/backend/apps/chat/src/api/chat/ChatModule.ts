import { Module } from '@nestjs/common';

import { ServicesModule } from '@chat/services/ServicesModule';

import { ChatController } from './ChatController';
import { ChatService } from './ChatService';

@Module({
    imports: [ServicesModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule {
}
