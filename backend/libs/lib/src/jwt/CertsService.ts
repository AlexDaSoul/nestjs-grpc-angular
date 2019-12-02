import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable, timer, throwError } from 'rxjs';
import { retryWhen, tap, mergeMap } from 'rxjs/operators';

import { GetCertStreamRes } from '@grpc-proto/auth/auth_pb';

import { Logger } from '@lib/logger';
import { grpcAuth } from '@lib/utils/GrpcConfigs';

interface IAuthService {
    getCertStream(): Observable<GetCertStreamRes.AsObject>;
}

const RETRY = 10;

@Injectable()
export class CertsService implements OnModuleInit {
    private readonly logger = new Logger('CertsService');

    @Client(grpcAuth) private readonly grpcAuthClient: ClientGrpc;
    private grpcAuthService: IAuthService;

    public onModuleInit(): void {
        this.grpcAuthService = this.grpcAuthClient.getService<IAuthService>('AuthService');

        this.grpcAuthService.getCertStream()
            .pipe(
                retryWhen(errors =>
                    errors.pipe(
                        tap(err => this.logger.error(err.message + '. Will try again after timeout in 3s.')),
                        mergeMap(() => (RETRY ? timer(3000) :
                            throwError(`Can't reconnect to CertStream', timeout expired.`))),
                    ),
                ),
            )
            .subscribe((res) => {
                process.env.JWT_PUB = res.key;
            });
    }
}
