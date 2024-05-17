import { Derivatives } from './activation';
import { NetworkMath } from './networkMath';

class Gradient {
	private CostGradientWithRespectToPredicted(
		network: number[],
		dataset: number[]
	): number {
		return (2 / network.length) * NetworkMath.Sum(network, dataset);
	}

	private PredictedGradientWithRespectToZ(z: number): number {
		return Derivatives.Sigmoid(z);
	}

	private ZGradientWithRespectToWi(x: number) {
		return x;
	}

	public CostGradientWithRespectToWi(
		network: number[],
		dataset: number[],
		z: number,
		x: number
	): number {
		return (
			this.CostGradientWithRespectToPredicted(network, dataset) *
			this.PredictedGradientWithRespectToZ(z) *
			this.ZGradientWithRespectToWi(x)
		);
	}

	public CostGradientWithRespectToBias(
		network: number[],
		dataset: number[],
		z: number
	): number {
		return (
			this.CostGradientWithRespectToPredicted(network, dataset) *
			this.PredictedGradientWithRespectToZ(z)
		);
	}
}

export const gradient = new Gradient();
export { Gradient };
