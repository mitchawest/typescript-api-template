import SwaggerUI from '@root/src/app/models/swagger.model';

const swaggerHandler = new SwaggerUI('openapi.yaml', {
    supportHeaderParams: true,
    customSiteTitle: 'Mitchell-West.com',
});

export default swaggerHandler;