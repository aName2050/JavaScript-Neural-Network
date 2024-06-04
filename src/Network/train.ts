import { MNIST } from '../Util/importer';
import { nn } from '../index';
import { NeuralNetwork } from './Network';

import { learnCycles, learnRate } from '../../Config/config.json';

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

process.on('message', (message: string) => {
	if (message === 'beginTraining') {
		trainNetwork(nn);
		process.send?.('finishedTraining');
	}
});
