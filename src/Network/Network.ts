import { Layer } from './Layer';

export class NeuralNetwork {
	public Layers: Layer[] = [];

	constructor(
		inputLayerSize: number,
		hiddenLayerConfig: number[],
		outputLayerSize: number
	) {
		// input layer
		this.Layers.push(new Layer(inputLayerSize, 0, true));

		// hidden layers
		for (let i = 0; i < hiddenLayerConfig.length; i++) {
			const prevLayer = this.Layers[this.Layers.length - 1];

			this.Layers.push(
				new Layer(hiddenLayerConfig[i], prevLayer.Neurons.length, false)
			);
		}

		// output layers
		this.Layers.push(
			new Layer(
				outputLayerSize,
				this.Layers[this.Layers.length - 1].Neurons.length,
				false
			)
		);
	}

	/**
	 *
	 * @param networkInputs The inputs of the network
	 * @returns The output layer
	 */
	public forwardPropagation(networkInputs: number[]): number[] {
		let networkOutput: number[] = [];

		let layerOutput: number[] = networkInputs;

		for (let i = 1; i < this.Layers.length; i++) {
			let layerOutAsArray: number[] = [];
			for (let j = 0; j < this.Layers[i].Neurons.length; j++) {
				layerOutAsArray.push(
					this.Layers[i].getLayerOutput(layerOutput)
				);
			}

			layerOutput = layerOutAsArray;
			networkOutput = layerOutput;
		}

		return networkOutput;
	}

	public train(
		networkInputs: number[],
		datasetInputs: number[],
		learnRate: number
	): void {
		// TODO:
	}
}
