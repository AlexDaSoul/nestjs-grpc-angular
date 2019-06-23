import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeorm } from './env';

import { CommonModule } from './common/common.module';
import { MessageModule } from './message/message.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeorm),
        CommonModule,
        MessageModule,
    ],
})
export class AppModule {}
