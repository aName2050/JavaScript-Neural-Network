import express, { Application } from 'express';
import path from 'node:path';
import { SERVER } from '../../Config/config.json';
import bodyParser from 'body-parser';
import { Worker } from 'node:worker_threads';
import { nn } from '../index';
import { output } from '../Util/output';
import { NeuralNetwork } from '../Network/Network';

export const app: Application = express();
export const PORT: number = SERVER.PORT;

let network: NeuralNetwork = nn;

const trainScript: string = './src/Network/train.ts';
const worker = new Worker(trainScript, {
	workerData: JSON.stringify(nn),
	execArgv: ['-r', 'ts-node/register'],
});

worker.on('message', (data: [string, string]) => {
	if (data[0] === 'finishedTraining') {
		network = JSON.parse(data[1]);
		nn.STATE = 'READY_FOR_PREDICTING';
	}
});

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
	const netowrkInputs: number[] = req.body.input;
	const networkOutput: number[] = nn.forwardPropagation(netowrkInputs);
	res.json(JSON.stringify({ output: output(networkOutput) }));
});
app.get('/api/v2/nn/predict', (_req, res, _next) => {
	res.status(405).json({
		message: 'Method not allowed',
		status: 405,
	});
});

app.get('/api/v2/nn/status', (_req, res, _next) => {
	res.status(200).json({
		status: nn.STATE.toString(),
	});
});

app.post('/api/v2/nn/train', (_req, res, _next) => {
	worker.postMessage('beginTraining');
	if (nn.STATE === 'TRAINING') {
		return res.status(400).json({
			message: 'Network is already training',
			status: nn.STATE.toString(),
		});
	}
	res.status(200).json({
		message: 'Training has started...',
		status: nn.STATE.toString(),
	});
});
