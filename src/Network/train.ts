import { MNIST } from '../Util/importer';
import { NeuralNetwork } from './Network';
import { Worker, workerData, parentPort } from 'node:worker_threads';

import { learnCycles, learnRate } from '../../Config/config.json';

const nn = NeuralNetwork.fromJSON(workerData);

// fixme: i dont know why this doesnt work, and i dont know how to fix it.

const mnist = new MNIST();
mnist.preprocess();

const { DATASET: dataset } = mnist;

// const trainNetwork = (network: NeuralNetwork) => {
// 	const trainStart = Date.now();
// 	console.log('Starting network training...');
// 	// train
// 	for (let i = 0; i < learnCycles; i++) {
// 		for (let j = 0; j < dataset.data.length; j++) {
// 			const cost = network.train(
// 				dataset.data[j].input,
// 				dataset.data[j].output,
// 				learnRate
// 			);
// 			parentPort?.postMessage([
// 				'log',
// 				[
// 					`(${i + 1}/${learnCycles} - ${j + 1}/${
// 						dataset.data.length
// 					}) cost:`,
// 					cost,
// 				],
// 			]);
// 		}
// 	}
// 	console.log(`Training finished in ${Date.now() - trainStart}ms`);
// };

const runGarbageCollection = () => {
	if (global.gc) {
		global.gc();
	} else {
		console.warn('Garbage collection is not exposed');
	}
};

const trainNetwork = (network: NeuralNetwork) => {
	const batchSize = 32; // change as needed
	const trainStart = Date.now();
	console.log('Starting network training...');

	for (let epoch = 0; epoch < learnCycles; epoch++) {
		let costSum = 0;
		for (
			let batchStart = 0;
			batchStart < dataset.data.length;
			batchStart += batchSize
		) {
			const batch = dataset.data.slice(
				batchStart,
				batchStart + batchSize
			);
			let batchCost = 0;
			batch.forEach(sample => {
				const cost = network.train(
					sample.input,
					sample.output,
					learnRate
				);
				batchCost += cost;
			});
			costSum += batchCost / batch.length;

			if (batchStart % (batchSize * 10) === 0) {
				parentPort?.postMessage([
					'log',
					[
						`Epoch ${epoch + 1}, Batch ${
							batchStart / batchSize
						}, Average Cost: ${batchCost / batch.length}`,
					],
				]);
			}
		}

		parentPort?.postMessage([
			'log',
			[
				`(Epoch ${epoch + 1}/${learnCycles} - ${
					Date.now() - trainStart
				}ms) cost:`,
				costSum / dataset.data.length,
			],
		]);
		runGarbageCollection();
	}

	console.log(`Training finished in ${Date.now() - trainStart}ms`);

	return network;
};

parentPort?.on('message', (message: string) => {
	if (message === 'beginTraining') {
		const trainedNetwork = trainNetwork(nn);
		parentPort?.postMessage(['finishedTraining', trainedNetwork.toJSON()]);
	}
});
