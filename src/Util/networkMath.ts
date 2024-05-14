class NNMath {
	public DotProduct(inputs: number[], weights: number[]): number {
		return inputs.map((v, i) => v * i).reduce((pV, cV) => pV + cV);
	}

	public MSE(actual: number, predicted: number): number {
		return Math.pow(actual - predicted, 2);
	}

	// TODO:
	// public Cost(actualValues: number[], predictedValues: number[]): number {

	// }
}

export const NetworkMath = new NNMath();
export { NNMath };
