import { NeuralNetwork } from './Network/Network';
import { ActivationFunction } from './Util/activation';

export const nn = new NeuralNetwork(
	28 * 28, // Input layer (784 nodes or 28x28 pixels)
	[128, 64], // Hidden layers (128 nodes and 64 nodes)
	10, // Output layer (10 nodes)
	ActivationFunction.LeakyReLU
);
