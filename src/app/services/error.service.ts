import { ERROR_CODES } from '@util/config';
import { CustomErrorResponse } from '@model/response.model';
import { IdentifiedErrorHandler } from '@model/request.model';
import logger from '@service/logger.service';

/* Error handler used by the express router to make for easier error responding in the features. Any caught error in features can be passed to the express next function callback
    and this service will interpret based on error code/message or fall back to a server error if code/message cannot be identified */
const errorHandler: IdentifiedErrorHandler = (err, req, res, next) => {
    const errorCode: number | null = Number(err.statusCode) || Number(err.code) || Number(err.status) || null;
    const errorMessage = err.message || err.errorMessage || null;
    /* If error code identified and is present in the error constant generate response object and send */
    if (errorCode && Object.keys(ERROR_CODES).includes(errorCode.toString())) {
        logger.error(`Request error | Method: ${req.method} | Path: ${req.path} | Identifier: ${req.requestIdentifier} | Message: ${errorMessage}`);
        logger.debug(err);
        res.status(errorCode).send(new CustomErrorResponse(errorCode, req.requestIdentifier, req.path, errorMessage || ERROR_CODES[errorCode], err).getErrorResponse());
        next();
        return;
    }
    /* If error code not present or identified, but error message present and contains a string from the error constant values, generate response object and send */
    if (errorMessage) {
        Object.keys(ERROR_CODES).forEach((key: String) => {
            if (errorMessage.toUpperCase().includes(ERROR_CODES[Number(key)].toUpperCase())) {
                logger.error(`Request error | Method: ${req.method} | Path: ${req.path} | Identifier: ${req.requestIdentifier} | Message: ${errorMessage}`);
                logger.debug(err);
                res.status(Number(key)).send(new CustomErrorResponse(Number(key), req.requestIdentifier, req.path, errorMessage, err).getErrorResponse())
                next();
            }
        });
        return;
    }
    /* If response not yet identified, send server error */
    logger.error(`Request error | Method: ${req.method} | Path: ${req.path} | Identifier: ${req.requestIdentifier} | Message: ${errorMessage || 'Internal Server Error'}`);
    logger.debug(err);
    res.status(500).send(new CustomErrorResponse(500, req.requestIdentifier, req.path, errorMessage || ERROR_CODES[500], err).getErrorResponse());
    next();

}

export default errorHandler;