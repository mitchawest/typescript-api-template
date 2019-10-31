import winston from 'winston';
import { ColorizeOptions } from 'logform';
import util from 'util';


/* This class creates a winston logger and transports when instantiated with the necessary configuration options. A console logger transport is created by default
    and other transports can be added if the configurations are included */
export default class WinstonLogger {
    private transports: Array<winston.transports.ConsoleTransportInstance | winston.transports.FileTransportInstance | winston.transports.HttpTransportInstance |
        winston.transports.StreamTransportInstance> = [];
    private logger: winston.Logger;

    constructor (minimumLevel: string, showLogs: boolean, levels: winston.LoggerOptions['levels'], colors?: ColorizeOptions['colors'], namespace?: string, consoleOptions?: winston.transports.ConsoleTransportOptions,
        fileOptions?: winston.transports.FileTransportOptions, httpOptions?: winston.transports.HttpTransportOptions, streamOptions?: winston.transports.StreamTransportOptions) {

        /* Create the logger transports */
        this.transports.push(new winston.transports.Console(consoleOptions || undefined));
        if (fileOptions) this.transports.push(new winston.transports.File(fileOptions));
        if (httpOptions) this.transports.push(new winston.transports.Http(httpOptions));
        if (streamOptions) this.transports.push(new winston.transports.Stream(streamOptions));

        /* create the logger */
        this.logger = winston.createLogger({
            level: minimumLevel,
            levels: levels,
            format: winston.format.combine(
                winston.format.prettyPrint(),
                winston.format.timestamp(),
                winston.format.splat(),
                colors ? winston.format.colorize({
                    level: true, colors: colors
                }) : undefined,
                winston.format.printf(msg => `${msg.timestamp} ${namespace ? `[${namespace}]` : null} ${msg.level}: ${msg.message}`)
            ),
            transports: this.transports,
            exitOnError: false,
            silent: !showLogs
        });
    }

    /* This adds a log method that allows for both strings or objects to be passed and prevents any issues with JSON.stringify on objects with a circular reference */
    log = (message: string | object, level: string) => {
        if (typeof message === 'string') this.logger.log(level, message);
        if (typeof message === 'object') this.logger.log(level, util.format('%o', message));
    }
}
