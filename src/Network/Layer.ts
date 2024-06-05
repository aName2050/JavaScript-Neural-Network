import { ActivationFunction } from '../Util/activation';
import { Neuron } from './Neuron';

export class Layer {
	public Neurons: Neuron[] = [];
	public isInputLayer: boolean;
	public CONFIG: (number | boolean | undefined)[];

	constructor(
		layerSize: number,
		nextLayerSize: number,
		prevLayerSize?: number,
		isInputLayer?: boolean
	) {
		this.CONFIG = [layerSize, nextLayerSize, prevLayerSize, isInputLayer];
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

	public toJSON() {
		return {
			Neurons: this.Neurons,
			CONFIG: this.CONFIG,
		};
	}

	public static fromJSON(data: any): Layer {
		const layer = new Layer(
			data.CONFIG[0],
			data.CONFIG[1],
			data.CONFIG[2],
			data.CONFIG[3]
		);
		layer.Neurons = data.Neurons.map((n: any) => Neuron.fromJSON(n));
		return layer;
	}
}
