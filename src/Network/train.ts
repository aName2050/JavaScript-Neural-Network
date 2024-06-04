import { MNIST } from '../Util/importer';
import { NeuralNetwork } from './Network';
import { Worker, workerData, parentPort } from 'node:worker_threads';

import { learnCycles, learnRate } from '../../Config/config.json';

const nn = JSON.parse(workerData);

// fixme: i dont know why this doesnt work, and i dont know how to fix it.

const mnist = new MNIST();
mnist.preprocess();

const { DATASET: dataset } = mnist;

const trainNetwork = (network: NeuralNetwork) => {
	const trainStart = Date.now();
	console.log('Starting network training...');
	// train
	for (let i = 0; i < learnCycles; i++) {
		for (let j = 0; j < dataset.data.length; j++) {
			network.train(
				dataset.data[j].input,
				dataset.data[j].output,
				learnRate
			);
		}
	}
	console.log(`Training finished in ${Date.now() - trainStart}ms`);
};

parentPort?.on('message', (message: string) => {
	if (message === 'beginTraining') {
		trainNetwork(nn);
		parentPort?.postMessage('finishedTraining');
	}
});
