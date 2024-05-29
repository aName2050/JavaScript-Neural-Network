import express, { Application } from 'express';
import path from 'node:path';
import { SERVER } from '../../Config/config.json';
import bodyParser from 'body-parser';

import { nn } from '../index';

export const app: Application = express();
export const PORT: number = SERVER.PORT;

// application/json
app.use(bodyParser.json());
// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, './public')));

app.get('/', (_req, res, _next) => {
	res.status(200).sendFile('./src/Showcase/public/index.html', { root: '.' });
});

// API
app.post('/api/v2/nn/predict', (req, res, _next) => {
	const netowrkInputs: number[] = req.body;
	console.log('in request');
	console.log((netowrkInputs as any).inputs);
	const networkOutput: number[] = nn.forwardPropagation(netowrkInputs);
	res.json(JSON.stringify(networkOutput));
});
app.get('/api/v2/nn/predict', (_req, res, _next) => {
	res.status(405).json({
		message: 'Method not allowed',
		status: 405,
	});
});
