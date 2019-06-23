import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { MessageController } from './message.controller';

@Module({
    imports: [CommonModule],
    controllers: [MessageController],
})
export class MessageModule {}
