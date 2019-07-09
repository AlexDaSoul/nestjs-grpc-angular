import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';
import { StatusController } from './status.controller';

@Module({
    imports: [CommonModule],
    controllers: [StatusController],
})
export class StatusModule {}
