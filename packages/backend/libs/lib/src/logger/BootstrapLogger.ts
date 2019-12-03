import { LoggerService } from '@nestjs/common';

import { Logger } from './Logger';

const DEFAULT_LOGGER_NAME = 'bootstrap';

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
