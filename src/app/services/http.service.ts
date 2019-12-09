import https from 'https';
import http, { OutgoingHttpHeaders, ClientRequest, IncomingMessage } from 'http';
import { Observable, Subscriber } from 'rxjs';

export default class HttpService {
    observable: Observable<unknown>;
    subscriber: Subscriber<unknown>;

    constructor() {
        this.observable = new Observable(subscriber => (this.subscriber = subscriber));
    }

    responseHandler = (response: IncomingMessage) => {
        let dataArray: any[] = [];
        response.on('error', error => this.subscriber.error(error));
        response.on('data', data => dataArray.push(data));
        response.on('end', () => {
            try {
                this.subscriber.next(JSON.parse(dataArray.join('').toString()));
            } catch {
                this.subscriber.next(dataArray.join('').toString());
            }
        });
    };

    get = (host: string, port?: number, path: string = '/', query: string = '', headers: OutgoingHttpHeaders = null, useHttp: boolean = false) =>
        new Promise((resolve, reject) => {
            this.observable.subscribe(resolve, reject);
            let request: ClientRequest;
            if (useHttp) {
                request = http.request({ method: 'GET', host, port: port || 8080, path: path + query, headers, protocol: 'http:' }, this.responseHandler);
            } else {
                request = https.request({ method: 'GET', host, port: port || 443, path: path + query, headers, protocol: 'https:', rejectUnauthorized: true }, this.responseHandler);
            }
            request.on('error', error => this.subscriber.error(error));
            request.write('');
            request.end();
        });

    delete = (host: string, port?: number, path: string = '/', query: string = '', headers: OutgoingHttpHeaders = null, useHttp: boolean = false) =>
        new Promise((resolve, reject) => {
            this.observable.subscribe(resolve, reject);
            let request: ClientRequest;
            if (useHttp) {
                request = http.request({ method: 'DELETE', host, port: port || 8080, path: path + query, headers, protocol: 'http:' }, this.responseHandler);
            } else {
                request = https.request({ method: 'DELETE', host, port: port || 443, path: path + query, headers, protocol: 'https:', rejectUnauthorized: true }, this.responseHandler);
            }
            request.on('error', error => this.subscriber.error(error));
            request.write('');
            request.end();
        });

    post = (host: string, port?: number, path: string = '/', query: string = '', body?: any, headers: OutgoingHttpHeaders = null, useHttp: boolean = false) =>
        new Promise((resolve, reject) => {
            this.observable.subscribe(resolve, reject);
            let request: ClientRequest;
            if (useHttp) {
                request = http.request({ method: 'POST', host, port: port || 8080, path: path + query, headers, protocol: 'http:' }, this.responseHandler);
            } else {
                request = https.request({ method: 'POST', host, port: port || 443, path: path + query, headers, protocol: 'https:', rejectUnauthorized: true }, this.responseHandler);
            }
            request.on('error', error => this.subscriber.error(error));
            request.write(body);
            request.end();
        });

    patch = (host: string, port?: number, path: string = '/', query: string = '', body?: any, headers: OutgoingHttpHeaders = null, useHttp: boolean = false) =>
        new Promise((resolve, reject) => {
            this.observable.subscribe(resolve, reject);
            let request: ClientRequest;
            if (useHttp) {
                request = http.request({ method: 'PATCH', host, port: port || 8080, path: path + query, headers, protocol: 'http:' }, this.responseHandler);
            } else {
                request = https.request({ method: 'PATCH', host, port: port || 443, path: path + query, headers, protocol: 'https:', rejectUnauthorized: true }, this.responseHandler);
            }
            request.on('error', error => this.subscriber.error(error));
            request.write(body);
            request.end();
        });

    put = (host: string, port?: number, path: string = '/', query: string = '', body?: any, headers: OutgoingHttpHeaders = null, useHttp: boolean = false) =>
        new Promise((resolve, reject) => {
            this.observable.subscribe(resolve, reject);
            let request: ClientRequest;
            if (useHttp) {
                request = http.request({ method: 'PUT', host, port: port || 8080, path: path + query, headers, protocol: 'http:' }, this.responseHandler);
            } else {
                request = https.request({ method: 'PUT', host, port: port || 443, path: path + query, headers, protocol: 'https:', rejectUnauthorized: true }, this.responseHandler);
            }
            request.on('error', error => this.subscriber.error(error));
            request.write(body);
            request.end();
        });

    options = (host: string, port?: number, path: string = '/', query: string = '', headers: OutgoingHttpHeaders = null, useHttp: boolean = false) =>
        new Promise((resolve, reject) => {
            this.observable.subscribe(resolve, reject);
            let request: ClientRequest;
            if (useHttp) {
                request = http.request({ method: 'OPTIONS', host, port: port || 8080, path: path + query, headers, protocol: 'http:' }, this.responseHandler);
            } else {
                request = https.request({ method: 'OPTIONS', host, port: port || 443, path: path + query, headers, protocol: 'https:', rejectUnauthorized: true }, this.responseHandler);
            }
            request.on('error', error => this.subscriber.error(error));
            request.write('');
            request.end();
        });

    head = (host: string, port?: number, path: string = '/', query: string = '', headers: OutgoingHttpHeaders = null, useHttp: boolean = false) =>
        new Promise((resolve, reject) => {
            this.observable.subscribe(resolve, reject);
            let request: ClientRequest;
            if (useHttp) {
                request = http.request({ method: 'HEAD', host, port: port || 8080, path: path + query, headers, protocol: 'http:' }, this.responseHandler);
            } else {
                request = https.request({ method: 'HEAD', host, port: port || 443, path: path + query, headers, protocol: 'https:', rejectUnauthorized: true }, this.responseHandler);
            }
            request.on('error', error => this.subscriber.error(error));
            request.write('');
            request.end();
        });
}
