import {
	ActivationFunction,
	ActivationFunctionDictionary,
	ActivationFunctions,
} from '../Util/activation';
import { NetworkMath } from '../Util/networkMath';
import { Random } from '../Util/math';

export class Neuron {
	public weights: number[];
	public bias: number;

	constructor(
		totalInputs: number,
		totalOutputs: number,
		isInputNode?: boolean
	) {
		if (isInputNode) {
			this.bias = 0;
			this.weights = [];
			return;
		}

		// console.log(`INIT in: ${totalInputs}`, `out: ${totalOutputs}`);

		this.bias = Random(0.5, -0.5);
		this.weights = Array.from({ length: totalInputs }, () =>
			this.Xavier(totalInputs, totalOutputs)
		);

		// console.log(`INIT bias: ${this.bias} weights: ${this.weights}`);
	}

	public getNeuronOutput(
		neuronInputs: number[],
		activationFunction: ActivationFunction
	): number {
		let z: number = NetworkMath.DotProduct(neuronInputs, this.weights);

		let NeuronActivation: number = ActivationFunctionDictionary[
			activationFunction
		](z + this.bias);

		return NeuronActivation;
	}

	private Xavier(inSize: number, outSize: number): number {
		const limit = Math.sqrt(6 / (inSize + outSize));
		return Random(limit, -limit);
	}
}
