import { Neuron } from './Neuron';

export class Layer {
	public Neurons: Neuron[] = [];

	constructor(
		layerSize: number,
		nextLayerSize: number,
		prevLayerSize?: number,
		isInputLayer?: boolean
	) {
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
	public getLayerOutput(inputs: number[]): number {
		let z: number = 0;
		for (const neuron of this.Neurons) {
			z += neuron.getNeuronOutput(inputs);
		}

		return z;
	}
}
