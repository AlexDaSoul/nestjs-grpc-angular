import { LoggerService } from '@nestjs/common';

import { Logger } from './Logger';

const DEFAULT_LOGGER_NAME = 'bootstrap';

// Nest applications require a logger
// that implements LoggerService interface,
// which is not needed in other cases.
//
// Therefore we will create a separate class
// that will be used only in the "main.ts" file
//
// Example for "main.ts":
// import { Logger as NestLogger } from '@nestjs/common';
//
// const logger = new BootstrapLogger();
// NestLogger.overrideLogger(logger);
//
// async function bootstrap() {
//   const app = await NestFactory.createMicroservice();
//   app.useLogger(logger);
//   ...
// }
//
// bootstrap().catch(err => {
//   logger.error(err);
//   ...
// });
export class BootstrapLogger implements LoggerService {
    private logger: Logger;

    constructor(private readonly label?: string) {
        this.logger = new Logger(this.label ? this.label : DEFAULT_LOGGER_NAME);
    }

    public log(message: any, context?: string): void {
        this.logger.info(message);
    }

    public error(message: any, trace?: string, context?: string): void {
        this.logger.error(message);
    }

    public warn(message: any, context?: string): void {
        // our implementation of the logger does not yet need
        // the "warning" level, so we will write the logs
        // coming from here to "error" level
        this.logger.error(message);
    }
}
