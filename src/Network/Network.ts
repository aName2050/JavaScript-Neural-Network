import { gradient } from '../Util/gradients';
import { NetworkMath } from '../Util/networkMath';
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
		dataset: number[],
		learnRate: number
	): void {
		/**
		 * !! CALCULUS !!
		 *
		 * lots of calculus...
		 */
		const networkOutputs: number[] = this.forwardPropagation(networkInputs);
		const cost = NetworkMath.Cost(networkOutputs, dataset);

		// Backpropagation algorithm (using gradient descent)
		const GradientDescent = gradient;
		// back propagation: forward propagation but backwards
		let layerOut: number[] = networkInputs;
		for (let layer = 1; layer < this.Layers.length; layer++) {
			// loop over each neuron in layer
			let currLayerOut: number[] = [];

			for (
				let neuron = 0;
				neuron < this.Layers[layer].Neurons.length;
				neuron++
			) {
				const Z: number =
					this.Layers[layer].Neurons[neuron].getNeuronOutput(
						layerOut
					);
				currLayerOut.push(Z);

				for (
					let weight = 0;
					weight < this.Layers[layer].Neurons[neuron].weights.length;
					weight++
				) {
					this.Layers[layer].Neurons[neuron].weights[weight] =
						NetworkMath.UpdateWeight(
							this.Layers[layer].Neurons[neuron].weights[weight],
							learnRate,
							networkOutputs,
							dataset,
							Z
							// TODO: fix
							// layerOut
						);
				}

				this.Layers[layer].Neurons[neuron].bias =
					NetworkMath.UpdateBias(
						this.Layers[layer].Neurons[neuron].bias,
						learnRate,
						networkOutputs,
						dataset,
						Z
					);
			}

			layerOut = currLayerOut;
		}
	}
}
