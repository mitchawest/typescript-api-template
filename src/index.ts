import init from '@app/server';
import fs from 'fs';
import path from 'path';
import { LEVELS } from '@util/enums';

/* Load env variables from .env file if non-production environment*/
if (process.env.NODE_ENV !== 'PROD') {
    console.log('Loading env...')
    const env = fs.readFileSync(path.resolve('./.env')).toString().split('\r\n');
    env.forEach(variable => {
        const [envKey, envValue] = variable.split('=').map(string => string.replace(/'/g, '').replace(/"/g, ''));
        if (envKey.length && envValue.length) process.env[envKey] = envValue;
    });
}

/* Loop through arguments for log level enum and set as minimum log level if a match is found */
process.argv.forEach(arg => {
    if (Object.keys(LEVELS).includes(arg)) process.env.DEFAULTLOGLEVEL = arg;
});

init();

