import { Module } from '@nestjs/common';

import { JwtCertsService } from './JwtCertsService';
import { PemCertsService } from './PemCertsService';
import { CertSubscribeService } from './CertSubscribeService';

@Module({
    providers: [JwtCertsService, PemCertsService, CertSubscribeService],
    exports: [JwtCertsService, PemCertsService, CertSubscribeService],
})
export class ServicesModule {
}
