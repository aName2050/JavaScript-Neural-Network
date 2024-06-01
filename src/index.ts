import { NeuralNetwork } from './Network/Network';
import { ActivationFunction } from './Util/activation';

import { app, PORT } from './Showcase/app';

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

export const nn = new NeuralNetwork(
	28 * 28,
	[16, 16],
	10,
	ActivationFunction.Sigmoid
);
