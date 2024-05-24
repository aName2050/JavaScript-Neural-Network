import { NeuralNetwork } from './Network/Network';
import { learnCycles, learnRate } from '../Config/config.json';
// import Dataset from '../Config/Data/dataset.json';
import { output } from './Util/output';
import { ActivationFunction } from './Util/activation';

import { MNIST } from './Util/importer';

const nn = new NeuralNetwork(28 * 28, [16, 16], 10, ActivationFunction.Sigmoid);

const mnist = new MNIST();
mnist.preprocess();

const dataset = mnist.DATASET;

const trainStart = Date.now();
console.log('Starting network training...');
// train
for (let i = 0; i < learnCycles; i++) {
	for (let j = 0; j < dataset.data.length; j++) {
		nn.train(dataset.data[j].input, dataset.data[j].output, learnRate);
	}
}
console.log(`Training finished in ${Date.now() - trainStart}ms`);
