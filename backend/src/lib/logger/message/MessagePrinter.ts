import { LogLevelType } from '../constants';
import { MessageBuilder } from './MessageBuilder';

const NOOP = () => ({});

export class MessagePrinter {
    constructor(private readonly messageBuilder: MessageBuilder) {}

    public print(level: LogLevelType, args: any[]): void {
        this.printPreparedMessage(this.messageBuilder.build(level, args) + '\n');
    }

    // chat: check this implementation in https://sdexnt.atlassian.net/browse/WEBBACK-485
    private printPreparedMessage(message: string): void {
        // see: https://github.com/nodejs/node/blob/master/lib/internal/console/constructor.js#L232

        // there may be an error occurring synchronously (e.g. for files or TTYs
        // on POSIX systems) or asynchronously (e.g. pipes on POSIX systems), so
        // handle both situations.
        try {
            // add and later remove a noop error handler to catch synchronous errors.
            if (process.stdout.listenerCount('error') === 0) {
                process.stdout.once('error', NOOP);
            }

            process.stdout.write(message, NOOP);
        } catch (err) {
            // there's no proper way to pass along the error here
        } finally {
            process.stdout.removeListener('error', NOOP);
        }
    }
}
