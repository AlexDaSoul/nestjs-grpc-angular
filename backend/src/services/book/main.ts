process.title = 'node-book';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import env from './env';

import { AppModule } from './app.module';

const logger = new Logger('bootstrap');

async function bootstrap() {
/*    const app = await NestFactory.createMicroservice(AppModule, env.grpc);

    app.useGlobalPipes(new ValidationPipe());
    await app.listenAsync();*/

    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}

bootstrap().catch(err => {
    logger.error(err);
    process.exit(1);
});
