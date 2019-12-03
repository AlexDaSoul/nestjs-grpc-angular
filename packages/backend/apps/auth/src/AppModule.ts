import { Module } from '@nestjs/common';

import { ApiModule } from './api/ApiModule';

@Module({
    imports: [
        ApiModule,
    ],
})
export class AppModule {
}
