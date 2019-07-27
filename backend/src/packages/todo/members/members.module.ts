import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { MembersController } from './members.controller';

@Module({
    imports: [CommonModule],
    controllers: [MembersController],
})
export class MembersModule {}
