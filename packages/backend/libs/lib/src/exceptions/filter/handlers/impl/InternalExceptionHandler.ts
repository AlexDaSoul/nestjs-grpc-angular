import { IExceptionHandler } from '../interfaces';

import { BaseException } from '../../../impl/BaseException';
import { InternalException } from '../../../impl/InternalException';

import { Logger } from '../../../../logger';

export class InternalExceptionHandler implements IExceptionHandler {
    private readonly logger = new Logger('InternalExceptionHandler');

    constructor(private readonly exception: Error, private readonly label: string) {
    }

    public wrapError(): BaseException {
        return new InternalException();
    }

    public warnAboutError(): void {
        const {stack, message} = this.exception;
        this.logger.error(`${this.label} :: Internal error "${message}",\nStack: ${stack}`);
    }
}
