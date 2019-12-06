import WinstonLogger from '@model/logger.model';
import fs from 'fs';

/* Instantiates a winston logger and dynamically creates methods for each log level defined in enums.
    It allows for a logger[level] method instead of directly using WinstonLogger.log() */
const logger: any = {
    init: (levels: any, colors: any) => {
        if (!levels) throw new Error('Log levels must be defined');
        // if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');
        /* Removes logs over 30 count in folder */
        // fs.readdirSync('./logs')
        //     .sort()
        //     .reverse()
        //     .filter((logName, i) => i >= 29)
        //     .map(logName => fs.unlinkSync(`./logs/${logName}`));
        /* Create winston logger */
        let winstonInstance = new WinstonLogger(
            process.env.DEFAULTLOGLEVEL || 'info',
            levels,
            colors,
            process.env.NAMESPACE || undefined,
            process.env.LOGCONSOLE.toUpperCase() === 'FALSE' ? false : true /*,
            './logs' */
        );
        Object.keys(levels).forEach(level => (logger[level] = (message: string | object) => winstonInstance.log(message, level)));
    }
};

export default logger;
