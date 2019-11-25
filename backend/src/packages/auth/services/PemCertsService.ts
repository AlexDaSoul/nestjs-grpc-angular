import { Injectable } from '@nestjs/common';
import { createCertificate } from 'pem';

import { serviceKey } from '../pki-dev/keys';
import { CertSubscribeService } from './CertSubscribeService';

const env = process.env;

@Injectable()
export class PemCertsService {
    constructor(private readonly certSubscribeService: CertSubscribeService) {
    }

    public createCertificate(): void {
        createCertificate({ serviceKey: env.DEVELOPMENT ? serviceKey : null }, (err, keys) => {
            if (err) {
                throw err;
            }

            env.JWT_PUB = keys.certificate;
            env.JWT_PRIV = keys.serviceKey;

            this.certSubscribeService.setCert(keys.certificate);
        });
    }
}
