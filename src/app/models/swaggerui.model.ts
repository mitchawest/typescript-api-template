import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import { RequestHandler } from 'express';

/* This class provides the necessary methods to  serve the swagger ui via the express router 
    Both YAML and JSON openapi v3 specifications are supported. */
export default class SwaggerUI {
    public openApiConfig: object;
    public serve = swaggerUi.serve;

    constructor(private pathToSwagger: string, private options?: any) {
        if (this.pathToSwagger.toUpperCase().includes('.YAML') || this.pathToSwagger.toUpperCase().includes('.YML')) {
            this.openApiConfig = yaml.safeLoad(fs.readFileSync(this.pathToSwagger, 'utf8'));
        } else {
            this.openApiConfig = JSON.parse(fs.readFileSync(this.pathToSwagger, 'utf8').toString());
        }
    }

    public setup = () => swaggerUi.setup(this.openApiConfig, this.options || null);
    public getOpenApiJSON: RequestHandler = (req, res, next) => {
        const cloned = { ...this.openApiConfig };
        res.status(200).send(cloned);
    };
}
