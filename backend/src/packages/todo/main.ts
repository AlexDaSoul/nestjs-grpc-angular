process.title = 'node-chat';

declare const module: any;

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { grpc } from './env';

import { AppModule } from './app.module';

const logger = new Logger('bootstrap');

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, grpc);

    app.useGlobalPipes(new ValidationPipe());
    await app.listenAsync();

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}

bootstrap().catch(err => {
    logger.error(err);
    process.exit(1);
});
