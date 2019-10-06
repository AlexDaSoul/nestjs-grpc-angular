import { Module } from '@nestjs/common';

import { AuthModule } from './auth/AuthModule';

@Module({
    imports: [AuthModule],
    exports: [AuthModule],
})
export class ApiModule {}
