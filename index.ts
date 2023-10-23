import { data as trainingData } from "./Config/Data/dataset.json"; // XOR training dataset
/*
Layer size needs to be fewer than the previous layer size, excluding input layer
[inputLayerSize, ...hiddenLayerSizes < prevLayerSize, outputLayer < prevHiddenLayerSize]
*/
import { NeuralNetwork } from "./Neural-Network/NeuralNetwork";
console.log(`TRAINING-DATA:`, trainingData);

const neuralNetwork: NeuralNetwork = new NeuralNetwork([2, 1, 1]);
// Training
const trainingCycles: number = 1;
const learnRate: number = 0.01;
console.log(`TRAINING_ training begun; ${trainingCycles} training cycles`);
for (let i = 0; i < trainingCycles; i++) {
	for (let j = 0; j < trainingData.length; j++) {
		const data = trainingData[j];

		console.log(
			`TRAINING_ cycle: ${i + 1}/${trainingCycles} training-data: ${
				j + 1
			}/${trainingData.length}`
		);
		console.log(
			`TRAINING_ EXPECTED... input: ${data.input} output: ${data.output}`
		);

		neuralNetwork.train(data.input, data.output, learnRate);
	}
}
// Testing
const testInput: number[] = [1, 1];
console.log(`TESTING_ input:`, testInput);

const output: number[] = neuralNetwork.forwardPropagation(testInput);
console.log("Neural Network Output:", neuralNetwork.getResult(output));
