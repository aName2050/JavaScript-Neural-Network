class NNMath {
	public DotProduct(inputs: number[], weights: number[]): number {
		return inputs.map((v, i) => v * i).reduce((pV, cV) => pV + cV);
	}

	public MSE(actual: number, predicted: number): number {
		return Math.pow(actual - predicted, 2);
	}

	public Cost(actualValues: number[], predictedValues: number[]): number {
		let MSEOutputs: number[] = [];
		for (let i = 0; i < actualValues.length; i++) {
			MSEOutputs.push(this.MSE(actualValues[i], predictedValues[i]));
		}

		const loss: number = MSEOutputs.reduce((pV, cV) => pV + cV);
		const C: number = (1 / predictedValues.length) * loss;

		return C;
	}
}

export const NetworkMath = new NNMath();
export { NNMath };
