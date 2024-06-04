import { NeuralNetwork } from './Network/Network';
import { ActivationFunction } from './Util/activation';

export const nn = new NeuralNetwork(
	28 * 28,
	[16, 16],
	10,
	ActivationFunction.Sigmoid
);
