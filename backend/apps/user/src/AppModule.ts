import { Module } from '@nestjs/common';

import { CertsService } from '@lib/jwt/CertsService';
import { ApiModule } from './api/ApiModule';

@Module({
    imports: [
        ApiModule,
    ],
    providers: [CertsService],
})
export class AppModule {
}
