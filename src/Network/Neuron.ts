import { ActivationFunctions } from '../Util/activation';
import { NetworkMath } from '../Util/networkMath';
import { Random } from '../Util/math';

export class Neuron {
	public weights: number[];
	public bias: number;

	constructor(totalInputs: number, isInputNode?: boolean) {
		if (isInputNode) {
			this.bias = 0;
			this.weights = [1];
			return;
		}

		this.bias = Random(-1, 1);
		this.weights = Array.from({ length: totalInputs }, () => Random(-1, 1));

		console.log(
			`[INITIALIZATION] [NEURON] bias: ${this.bias} weight: ${this.weights}`
		);
	}

	public getNeuronOutput(neuronInputs: number[]): number {
		let z: number = NetworkMath.DotProduct(neuronInputs, this.weights);

		return ActivationFunctions.Sigmoid(z + this.bias);
	}
}
