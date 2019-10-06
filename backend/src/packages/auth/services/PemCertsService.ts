import { Injectable } from '@nestjs/common';
import { createCertificate } from 'pem';

import { pemKeys } from '../env';

@Injectable()
export class PemCertsService {
    public createCertificate(): void {
        createCertificate((err, keys) => {
            if (err) {
                throw err
            }

            pemKeys.JWT_PUB = keys.certificate;
            pemKeys.JWT_PRIV = keys.serviceKey;
        });
    }
}
