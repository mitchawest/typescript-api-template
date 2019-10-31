import express from 'express';
import swaggerHandler from '@feature/swagger.feature';
import testHandler from '@feature/test.feature';

const router = express.Router();

router.use('/', swaggerHandler.serve);
router.get('/', swaggerHandler.setup());

router.get('/test/:responseType', testHandler.get);
router.post('/test', testHandler.post);

export default router;
