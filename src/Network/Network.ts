import { ActivationFunction } from '../Util/activation';
import { NetworkMath } from '../Util/networkMath';
import { Layer } from './Layer';
import { Neuron } from './Neuron';

type NetworkState =
	| 'NOT_READY'
	| 'READY_FOR_TRAINING'
	| 'TRAINING'
	| 'READY_FOR_PREDICTING'
	| 'PREDICTING';

interface NetworkConfig {
	Layers: {
		Neurons: Neuron[];
		CONFIG: (number | boolean | undefined)[];
	}[];
	STATE: NetworkState;
	TRAINED: boolean;
	CONFIG: (number | number[])[];
	activation: ActivationFunction;
}

export class NeuralNetwork {
	public Layers: Layer[] = [];
	private activation: ActivationFunction;
	public STATE: NetworkState = 'NOT_READY';
	public TRAINED: boolean = false;

	public CONFIG: (number | number[])[];

	constructor(
		inputLayerSize: number,
		hiddenLayerConfig: number[],
		outputLayerSize: number,
		activationFunction: ActivationFunction
	) {
		this.CONFIG = [inputLayerSize, [...hiddenLayerConfig], outputLayerSize];
		this.STATE = 'READY_FOR_TRAINING';
		this.activation = activationFunction;
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

	public toJSON(): NetworkConfig {
		return {
			Layers: this.Layers.map(l => l.toJSON()),
			STATE: this.STATE,
			TRAINED: this.TRAINED,
			CONFIG: this.CONFIG,
			activation: this.activation,
		};
	}

	public static fromJSON(data: NetworkConfig): NeuralNetwork {
		const nn = new NeuralNetwork(
			(data.CONFIG as number[])[0],
			(data.CONFIG as number[][])[1],
			(data.CONFIG as number[])[2],
			data.activation as ActivationFunction
		);
		nn.Layers = data.Layers.map((l: any) => Layer.fromJSON(l));
		nn.STATE = data.STATE;
		nn.TRAINED = data.TRAINED;
		nn.activation = data.activation as ActivationFunction;
		return nn;
	}

	/**
	 *
	 * @param networkInputs The inputs of the network
	 * @returns The output layer
	 */
	public forwardPropagation(networkInputs: number[]): number[] {
		this.STATE = 'PREDICTING';
		let networkOutput: number[] = networkInputs;

		for (let i = 1; i < this.Layers.length; i++) {
			networkOutput = this.Layers[i].getLayerOutput(
				networkOutput,
				this.activation
			);
			// console.log(
			// 	`layer (${i + 1}/${this.Layers.length}) (isInput?:${
			// 		this.Layers[i].isInputLayer
			// 	}) output:`,
			// 	networkOutput
			// );
		}
		this.STATE = !this.TRAINED
			? 'READY_FOR_TRAINING'
			: 'READY_FOR_PREDICTING';
		return networkOutput;
	}

	/**
	 * Trains the neural network with the given inputs and dataset.
	 *
	 * @param {number[]} networkInputs - The input values for the network.
	 * @param {number[]} dataset - The expected output values for the network.
	 * @param {number} learnRate - The learning rate for the network.
	 * @return {number} The cost of the network after training.
	 */
	public train(
		networkInputs: number[],
		dataset: number[],
		learnRate: number
	): number {
		this.STATE = 'TRAINING';
		/**
		 * !! CALCULUS !!
		 *
		 * lots of calculus...
		 */
		const networkOutputs: number[] = this.forwardPropagation(networkInputs);
		const cost = NetworkMath.Cost(networkOutputs, dataset);

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
				const Z: number = this.Layers[layer].Neurons[
					neuron
				].getNeuronOutput(layerOut, this.activation);
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

		this.STATE = 'READY_FOR_PREDICTING';
		this.TRAINED = true;

		return cost;
	}
}
