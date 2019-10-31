import { Request, Response, NextFunction } from 'express';

export interface IdentifiedRequest extends Request {
    requestIdentifier: string;
}

export interface IdentifiedRequestHandler {
    (req: IdentifiedRequest, res: Response, next: NextFunction): any
}

export interface IdentifiedErrorHandler {
    (err: any, req: IdentifiedRequest, res: Response, next: NextFunction): any
}