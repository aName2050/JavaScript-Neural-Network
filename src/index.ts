import { NeuralNetwork } from './Network/Network';

const nn = new NeuralNetwork(5, [3, 3], 2);

const data = [1, 2, 6, 7, 8];

console.log(nn.forwardPropagation(data));
