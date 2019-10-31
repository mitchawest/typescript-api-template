import uuidv4 from 'uuid/v4';
import { IdentifiedRequestHandler } from '@model/request.model';
import { whitelist, blacklist } from '@util/config';

/* Set the request identifier if included in body, headers, or query. If not included set random value. */
export const identifyRequest: IdentifiedRequestHandler = (req, res, next) => {
    if (req.body && req.body.requestMetaData && req.body.requestMetaData.requestIdentifier) {
        req.requestIdentifier = req.body.requestMetaData.requestIdentifier;
        next();
        return;
    }

    if (req.headers && (req.headers.requestIdentifier || req.headers.requestidentifier || req.headers.REQUESTIDENTIFIER)) {
        req.requestIdentifier = req.headers.requestIdentifier as string || req.headers.requestidentifier as string || req.headers.REQUESTIDENTIFIER as string;
        next();
        return;
    }

    if (req.query && req.query.requestIdentifier) {
        req.requestIdentifier = req.query.requestIdentifier;
        next();
        return;
    }
    req.requestIdentifier = uuidv4();
    next();
}

/* CORS options. Configure whitelist if desired behavior is to only allow specified origins.
    Configure blacklist if desired behavior is to only disallow specified origins.
    Configure neither if origin filter is not required. */
export const corsHandler: IdentifiedRequestHandler = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE");
    let origin = req.headers.Origin as string || req.headers.ORIGIN as string || req.headers.origin as string || null;

    if (origin && whitelist && whitelist.length) {
        if (whitelist.indexOf(origin) !== -1 || whitelist.indexOf(origin.toUpperCase()) !== -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            next();
            return;
        } else {
            next(new Error(`Unauthorized. Origin ${origin} not allowed by CORS policy.`));
            return;
        }
    }
    if (origin && blacklist && blacklist.length) {
        if (blacklist.indexOf(origin) !== -1 || blacklist.indexOf(origin.toUpperCase()) !== -1) {
            next(new Error(`Unauthorized. Origin ${origin} not allowed by CORS policy.`));
            return;
        } else {
            res.setHeader('Access-Control-Allow-Origin', origin);
            next();
            return;
        }
    }

    res.setHeader('Access-Control-Allow-Origin', '*')
    next();
}