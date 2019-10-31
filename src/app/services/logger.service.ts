import WinstonLogger from '@model/logger.model';

/* Instantiates a winston logger and dynamically creates methods for each log level defined in enums.
    It allows for a logger[level] method instead of directly using WinstonLogger.log() */
const logger: any = {
    init: (levels: any, colors: any) => {
        if (!levels) throw new Error('Log levels must be defined');
        let winstonInstance = new WinstonLogger(process.env.DEFAULTLOGLEVEL || 'info', process.env.LOGCONSOLE.toUpperCase() === 'FALSE' ? false : true,
            levels, colors, process.env.NAMESPACE || undefined);
        Object.keys(levels).forEach(level => logger[level] = (message: string | object) => winstonInstance.log(message, level));
    }
}

export default logger;
