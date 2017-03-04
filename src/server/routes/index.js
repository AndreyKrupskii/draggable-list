import express from 'express';
import layout from './../views/layout';
import Dictionary from './api/dictionary';

const router = express.Router();

new Dictionary(router);

router.get('/*', (req, res, next) => {
	res.send(layout);
});

export default router;