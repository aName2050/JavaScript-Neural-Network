import { gradient } from './gradients';

class NNMath {
	public DotProduct(x: number[], y: number[]): number {
		return x.map((v, i) => v * y[i]).reduce((pV, cV) => pV + cV);
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

	public Sum(x: number[], y: number[]): number {
		return x.map((v, i) => v - y[i]).reduce((pV, cV) => pV + cV);
	}

	public UpdateWeight(
		weight: number,
		learnRate: number,
		network: number[],
		dataset: number[],
		z: number,
		x: number
	): number {
		return (
			weight -
			learnRate *
				gradient.CostGradientWithRespectToWi(network, dataset, z, x)
		);
	}

	public UpdateBias(
		bias: number,
		learnRate: number,
		network: number[],
		dataset: number[],
		z: number
	): number {
		return (
			bias -
			learnRate *
				gradient.CostGradientWithRespectToBias(network, dataset, z)
		);
	}
}

export const NetworkMath = new NNMath();
export { NNMath };
