import { ActivationFunction } from '../Util/activation';
import { Neuron } from './Neuron';

export class Layer {
	public Neurons: Neuron[] = [];
	public isInputLayer: boolean;

	constructor(
		layerSize: number,
		nextLayerSize: number,
		prevLayerSize?: number,
		isInputLayer?: boolean
	) {
		this.isInputLayer = isInputLayer || false;
		if (isInputLayer || !prevLayerSize) {
			for (let i = 0; i < layerSize; i++) {
				this.Neurons.push(new Neuron(0, nextLayerSize, true));
			}
			return;
		}

		for (let i = 0; i < layerSize; i++) {
			this.Neurons.push(new Neuron(prevLayerSize!, nextLayerSize, false));
		}
	}

	/**
	 * The result of this method should be passed to the next layer, if any
	 */
	public getLayerOutput(
		inputs: number[],
		activationFunction: ActivationFunction
	): number[] {
		let z: number[] = [];
		for (const neuron of this.Neurons) {
			z.push(neuron.getNeuronOutput(inputs, activationFunction));
		}
		return z;
	}
}
