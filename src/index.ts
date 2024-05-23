import { NeuralNetwork } from './Network/Network';
import { learnCycles, learnRate } from '../Config/config.json';
// import Dataset from '../Config/Data/dataset.json';
import { output } from './Util/output';
import { ActivationFunction } from './Util/activation';
import { MNIST } from './Util/importer';

const nn = new NeuralNetwork(28 * 28, [16, 16], 10, ActivationFunction.Sigmoid);
