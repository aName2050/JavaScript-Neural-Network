import { NeuralNetwork } from './Network/Network';

const nn = new NeuralNetwork(4, [3, 3], 2);

const data = [23, 3]; // should result [1, 0]

console.log(nn.forwardPropagation(data));

const testTrainingData = [37, 2];
const expectedOut = [1, 0];
const LR = 0.01;

for (let i = 0; i < 1000; i++) {
	nn.train(testTrainingData, expectedOut, LR);
	console.log(`${i + 1}/1000 cycles completed`);
}

console.log(nn.forwardPropagation(data));
