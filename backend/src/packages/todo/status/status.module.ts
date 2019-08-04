import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
    imports: [DbModule],
    controllers: [StatusController],
    providers: [StatusService],
})
export class StatusModule {}
