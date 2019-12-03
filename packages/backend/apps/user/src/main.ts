process.title = 'node-user';

import { NestFactory } from '@nestjs/core';
import { Logger as NestLogger, ValidationPipe } from '@nestjs/common';

import { BootstrapLogger } from '@lib/logger';
import { grpcUser } from '@lib/utils/GrpcConfigs';

import { AppModule } from './AppModule';

export const logger = new BootstrapLogger();
// override logger with our implementation for transforming logs like
// "[Nest] 406   - 8/12/2019, 11:00:41 AM   [NestFactory] ..."
NestLogger.overrideLogger(logger);

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, grpcUser);

    app.useLogger(logger);
    app.useGlobalPipes(new ValidationPipe());

    await app.listenAsync();
}

bootstrap().catch(err => {
    logger.error(err);
    process.exit(1);
});
