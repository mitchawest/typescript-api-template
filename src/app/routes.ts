import express from 'express';
import swaggerService from '@service/swaggerui.service';
import testHandler from '@feature/test.feature';

const router = express.Router();

router.use('/', swaggerService.serve());
router.get('/', swaggerService.setup());
router.get('/api-docs', (req, res, next) => res.status(200).send(swaggerService.getJson()));
router.get('/test/:responseType', testHandler.get);
router.post('/test', testHandler.post);

export default router;
