import logger from '@service/logger.service';
import { IdentifiedRequestHandler } from '@model/request.model';
import {
    okResponse, createdResponse, acceptedResponse, nonAuthoritativeResponse, noContentResponse, resetContentResponse,
    partialContentResponse, multiStatusResponse, alreadyReportedResponse, imUsedResponse
} from '../services/response.service';

const testHandler = new class Test {
    get: IdentifiedRequestHandler = (req, res, next) => {
        logger.info(`Request received | Method: ${req.method} | Path: ${req.path} | Identifier: ${req.requestIdentifier}`);
        logger.debug(`Request query: ${JSON.stringify(req.query)}`);
        logger.debug(`Request params: ${JSON.stringify(req.params)}`)
        logger.verbose(req);

        if (req.params.responseType === 'ok') okResponse(req, res, 'ok');
        if (req.params.responseType === 'created') createdResponse(req, res, 'created');
        if (req.params.responseType === 'accepted') acceptedResponse(req, res, 'accepted');
        if (req.params.responseType === 'nonAuthoritative') nonAuthoritativeResponse(req, res, 'nonAuthoritative');
        if (req.params.responseType === 'noContent') noContentResponse(req, res, 'noContent');
        if (req.params.responseType === 'resetContent') resetContentResponse(req, res, 'resetContent');
        if (req.params.responseType === 'partialContent') partialContentResponse(req, res, 'partialContent');
        if (req.params.responseType === 'multiStatus') multiStatusResponse(req, res, 'multiStatus');
        if (req.params.responseType === 'alreadyReported') alreadyReportedResponse(req, res, 'alreadyReported');
        if (req.params.responseType === 'imUsed') imUsedResponse(req, res, 'imUsed');
        if (req.params.responseType === 'errorByCode') next({ message: 'error by code', code: 500 });
        if (req.params.responseType === 'errorByMessage') next({ message: 'bad request' });
        if (req.params.responseType === 'errorWithNone') next({});
        next();
    }

    post: IdentifiedRequestHandler = (req, res, next) => {
        logger.info(`Request received | Method: ${req.method} | Path: ${req.path} | Identifier: ${req.requestIdentifier}`);
        logger.debug(`Request query: ${JSON.stringify(req.query)}`);
        logger.debug(`Request params: ${JSON.stringify(req.params)}`);
        logger.debug(`Request body: ${JSON.stringify(req.body)}`)
        logger.verbose(req);

        okResponse(req, res, req.body);
        next();
    }
}

export default testHandler;