import { Module } from '@nestjs/common';

import { UserModule } from './user/UserModule';

@Module({
    imports: [UserModule],
    exports: [UserModule],
})
export class ApiModule {}
