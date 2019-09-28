import { Module } from '@nestjs/common';

import { StatusModule } from './status/StatusModule';
import { TaskModule } from './task/TaskModule';

@Module({
    imports: [StatusModule, TaskModule],
    exports: [StatusModule, TaskModule],
})
export class ApiModule {}
