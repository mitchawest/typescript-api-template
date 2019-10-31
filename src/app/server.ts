import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';

import router from '@app/routes';
import logger from '@service/logger.service';
import { LEVELS, COLORS } from '@util/enums';
import { identifyRequest, corsHandler } from '@util/utils';
import errorHandler from './services/error.service';
import http from 'http';

const init = async () => {
    try {
        const app = express();

        /* Initialize logger with log level enumeration */
        await logger.init(LEVELS, COLORS);

        /* for parsing application/json */
        app.use(bodyParser.json());

        /* Add request identifier if not present */
        app.use(identifyRequest);

        /* Allow or disallow origins */
        app.use(corsHandler);

        /* use to protect with strict transport security */
        app.use(helmet.hsts({
            maxAge: 10886400000, // Must be at least 18 weeks to be approved
            includeSubDomains: true, // Must be enabled to be approved
            preload: true
        }));

        /* X-XSS-Protection prevent reflected XSS attacks */
        app.use(helmet.xssFilter());

        app.use(router);

        /* Handle any errors generated by routes or previous handlers */
        app.use(errorHandler);

        const port = process.env.SERVER_PORT || 8000;

        const httpServer = http.createServer(app).listen(port)
        logger.info(`${process.env.NAMESPACE} server listening on port: ${port}`)

        return httpServer

    } catch (err) {
        if (logger.critical) {
            logger.critical(`Failed to start. Error: ${err}. Stopping node process.`);
        } else {
            console.log(`Failed to start. Error: ${err}. Stopping node process.`);
        }
        setTimeout(() => process.exit(1), 5000);
    }
}

export default init;