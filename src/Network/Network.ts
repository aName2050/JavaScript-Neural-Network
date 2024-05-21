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
		this.Layers.push(
			new Layer(
				inputLayerSize,
				hiddenLayerConfig[0] || outputLayerSize,
				0,
				true
			)
		);

		// hidden layers
		for (let i = 0; i < hiddenLayerConfig.length; i++) {
			const prevLayer = this.Layers[this.Layers.length - 1];

			this.Layers.push(
				new Layer(
					hiddenLayerConfig[i],
					hiddenLayerConfig[i + 1] || outputLayerSize,
					prevLayer.Neurons.length,
					false
				)
			);
		}

		// output layers
		this.Layers.push(
			new Layer(
				outputLayerSize,
				0,
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
		let networkOutput: number[] = networkInputs;

		for (let i = 1; i < this.Layers.length; i++) {
			networkOutput = this.Layers[i].getLayerOutput(networkOutput);
			// console.log(
			// 	`layer (${i + 1}/${this.Layers.length}) (isInput?:${
			// 		this.Layers[i].isInputLayer
			// 	}) output:`,
			// 	networkOutput
			// );
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
		console.log('cost:', cost);

		// Backpropagation algorithm (using gradient descent)
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

				// update each weight
				for (
					let weight = 0;
					weight < this.Layers[layer].Neurons[neuron].weights.length;
					weight++
				) {
					const oldWeight =
						this.Layers[layer].Neurons[neuron].weights[weight];
					this.Layers[layer].Neurons[neuron].weights[weight] =
						NetworkMath.UpdateWeight(
							oldWeight,
							learnRate,
							networkOutputs,
							dataset,
							Z,
							layerOut[weight]
						);

					console.log(
						`TRAINING... layer:${layer + 1}/${
							this.Layers.length
						} neuron:${neuron + 1}/${
							this.Layers[layer].Neurons.length
						} weight:${weight + 1}/${
							this.Layers[layer].Neurons[neuron].weights.length
						} oldWeight: ${oldWeight} newWeight: ${
							this.Layers[layer].Neurons[neuron].weights[weight]
						}`
					);
				}

				const oldBias = this.Layers[layer].Neurons[neuron].bias;
				this.Layers[layer].Neurons[neuron].bias =
					NetworkMath.UpdateBias(
						oldBias,
						learnRate,
						networkOutputs,
						dataset,
						Z
					);
				console.log(
					`TRAINING... layer:${layer + 1}/${
						this.Layers.length
					} neuron:${neuron + 1}/${
						this.Layers[layer].Neurons.length
					} oldBias: ${oldBias} newBias: ${
						this.Layers[layer].Neurons[neuron].bias
					}`
				);
			}

			layerOut = currLayerOut;
		}
	}
}
