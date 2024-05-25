import express, { Application } from 'express';
import path from 'node:path';
import { SERVER } from '../../Config/config.json';

import { nn } from '../index';

export const app: Application = express();
export const PORT: number = SERVER.PORT;

app.use('/static', express.static(path.join(__dirname, './public')));

app.get('/', (req, res, next) => {
	res.status(200).sendFile('./src/Showcase/public/index.html', { root: '.' });
});

// API
app.post('/api/v2/nn/predict', (req, res, next) => {
	console.log(req.body);
	res.sendStatus(500);
	// const netowrkInputs: number[] = req.body;
	// const networkOutput: number[] = nn.forwardPropagation(netowrkInputs);
	// res.json(JSON.stringify(networkOutput));
});
app.get('/api/v2/nn/predict', (req, res, next) => {
	res.status(405).json({
		message: 'Must use POST on this path',
		status: 405,
	});
});
