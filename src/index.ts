import { NeuralNetwork } from './Network/Network';
import { learnCycles, learnRate } from '../Config/config.json';
import Dataset from '../Config/Data/dataset.json';

/**
 * 2 nodes in input layer
 * 3 nodes in first hidden layer
 * 2 nodes in output layer
 */
const nn = new NeuralNetwork(2, [3], 2);

const testData = [23, 3];

// pre-training
// console.log('PRE-TRAINING...');
console.log(nn.forwardPropagation(testData));

// training
const { data } = Dataset;

// for (let i = 0; i < learnCycles; i++) {
// 	console.log(`Learn cycle (${i + 1}/${learnCycles})`);
// 	for (let d = 0; d < data.length; d++) {
// 		console.log(`Data (${d + 1}/${data.length})`);
// 		nn.train(data[d].input, data[d].output, learnRate);
// 	}
// }

// post-training
// console.log('POST-TRAINING...');
// console.log(nn.forwardPropagation(testData));
