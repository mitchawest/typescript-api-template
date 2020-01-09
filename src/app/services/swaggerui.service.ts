import SwaggerUI from '@model/swaggerui.model';

const swaggerService: { config: SwaggerUI; setup: SwaggerUI['setup']; serve: () => SwaggerUI['serve']; getJson: () => {} } = {
    config: new SwaggerUI('openapi.yaml', { supportHeaderParams: true, customSiteTitle: 'mdms-auth' }),
    setup: () => swaggerService.config.setup(),
    serve: () => swaggerService.config.serve,
    getJson: () => swaggerService.config.openApiConfig
};

export default swaggerService;
