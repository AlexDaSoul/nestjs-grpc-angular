import { Module } from '@nestjs/common';

import { JwtCertsService } from './JwtCertsService';
import { PemCertsService } from './PemCertsService';

@Module({
    providers: [JwtCertsService, PemCertsService],
    exports: [JwtCertsService, PemCertsService],
})
export class ServicesModule {}
