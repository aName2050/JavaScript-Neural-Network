import { NeuralNetwork } from './Network/Network';
import { learnCycles, learnRate } from '../Config/config.json';
import Dataset from '../Config/Data/dataset.json';
import { output } from './Util/output';
import { ActivationFunction } from './Util/activation';

const nn = new NeuralNetwork(1, [5, 5, 5], 1, ActivationFunction.LeakyReLU);

const testData = [3]; // expect: 3.4

// pre-training
console.log('PRE-TRAINING...');
output(nn.forwardPropagation(testData));
// console.log(nn.forwardPropagation(testData));

// training
const { data } = Dataset;

for (let i = 0; i < learnCycles; i++) {
	// console.log(`Learn cycle (${i + 1}/${learnCycles})`);
	for (let d = 0; d < data.length; d++) {
		// console.log(`Data (${d + 1}/${data.length})`);
		nn.train(data[d].input, data[d].output, learnRate);
	}
}

// post-training
console.log('POST-TRAINING...');
output(nn.forwardPropagation(testData));
// console.log(nn.forwardPropagation(testData));
