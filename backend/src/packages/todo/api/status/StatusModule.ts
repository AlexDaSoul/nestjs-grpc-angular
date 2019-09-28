import { Module } from '@nestjs/common';

import { ServicesModule } from '../../services/ServicesModule';

import { StatusController } from './StatusController';
import { StatusService } from './StatusService';

@Module({
    imports: [ServicesModule],
    controllers: [StatusController],
    providers: [StatusService],
})
export class StatusModule {}
