import { Module } from '@nestjs/common';

import { ServicesModule } from '../../services/ServicesModule';

import { MessageController } from './MessageController';
import { MessageService } from './MessageService';

@Module({
    imports: [ServicesModule],
    controllers: [MessageController],
    providers: [MessageService],
})
export class MessageModule {}
