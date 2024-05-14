import { Neuron } from './Neuron';

export class Layer {
	public Neurons: Neuron[] = [];

	constructor(layerSize: number, isInputLayer?: boolean) {
		if (isInputLayer) {
			for (let i = 0; i < layerSize; i++) {
				this.Neurons.push(new Neuron(0, true));
				console.log(
					`[INITIALIZATION] [NEURON] [INPUT_LAYER] ${
						i + 1
					}/${layerSize} created`
				);
			}
		}
	}
}
