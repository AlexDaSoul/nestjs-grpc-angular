import { LogLevelType } from '../constants';
import { colorizeTimestamp, colorizeLevel, colorizeLabel, colorizeMessage } from './colorizers';
import { padStart, padEnd } from '../format';

const DELIMITERS = {
    date: '-',
    time: ':',
    logMessage: ' ',
    fullMessage: ' :: '
};

export class MessageBuilder {
    private readonly colorizeMessages = process.env.LOGGER_COLORIZE_MESSAGES === 'true';

    constructor(private readonly label: string) {}

    public build(level: LogLevelType, args: any[]): string {
        const timestamp = this.getTimestamp();
        const logMessage = this.prepareMessageFromArgs(args);

        if (!this.colorizeMessages) {
            return [timestamp, level, this.label, logMessage].join(DELIMITERS.fullMessage);
        }

        return [colorizeTimestamp(timestamp), colorizeLevel(level), colorizeLabel(this.label), colorizeMessage(level, logMessage)].join(DELIMITERS.fullMessage);
    }

    private getTimestamp(): string {
        const date = new Date();
        const logDate = [padStart(date.getDate()), padStart(date.getMonth() + 1), date.getFullYear()].join(DELIMITERS.date);
        const logTime = [padStart(date.getHours()), padStart(date.getMinutes()), padEnd(date.getMilliseconds())].join(DELIMITERS.time);

        return `[${logDate} ${logTime}]`;
    }

    private prepareMessageFromArgs(args: any[]): string {
        return args
            .map(it => {
                const type = typeof it;

                // no need to prepare undefined, null, string & number types
                if (['number', 'string', 'undefined'].includes(type) || it === null) {
                    return it;
                }

                // try add stack or message from Error
                if (it instanceof Error) {
                    return `${it.stack || it.message || it}`;
                }

                // stringify other types, such as array, object
                return `${JSON.stringify(it, null, 2)}`;
            })
            .join(DELIMITERS.logMessage);
    }
}
