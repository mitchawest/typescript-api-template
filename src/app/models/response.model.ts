interface ResponseBody {
    requestMetaData: {
        statusCode: number
        requestIdentifier: string;
        api: string;
    },
    requestPayloadData: {
        data: object | string | object[] | string[]
    }
}

interface ErrorResponseBody {
    statusCode: number;
    requestIdentifier: string;
    api: string;
    message: string;
    stackTrace: string | object;
}

export class CustomResponse {
    public response: ResponseBody;

    constructor (statusCode: number, requestIdentifier: string, path: string, payload: ResponseBody['requestPayloadData']['data']) {
        this.response = {
            requestMetaData: {
                statusCode: statusCode,
                requestIdentifier: requestIdentifier,
                api: path
            },
            requestPayloadData: {
                data: payload
            }
        }
    }

    getResponse = () => this.response;
}

export class CustomErrorResponse {
    public errorResponse: ErrorResponseBody;

    constructor (statusCode: number, requestIdentifier: string, path: string, message: string, stackTrace: Error) {
        this.errorResponse = {
            statusCode: statusCode,
            requestIdentifier: requestIdentifier,
            api: path,
            message: message,
            stackTrace: stackTrace.stack
        }
    }

    getErrorResponse = () => this.errorResponse;
}