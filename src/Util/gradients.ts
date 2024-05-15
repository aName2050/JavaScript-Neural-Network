import { Derivatives } from './activation';
import { NetworkMath } from './networkMath';

class Gradient {
	private CostGradient_RespectToPredicted(
		network: number[],
		dataset: number[]
	): number {
		return (2 / network.length) * NetworkMath.Sum(network, dataset);
	}

	private PredictedGradient_RespectToZ(z: number): number {
		return Derivatives.Sigmoid(z);
	}

	private ZGradient_RespectToWi(x: number) {
		return x;
	}

	public CostGradient_RespectToWi(
		network: number[],
		dataset: number[],
		z: number,
		x: number
	): number {
		return (
			this.CostGradient_RespectToPredicted(network, dataset) *
			this.PredictedGradient_RespectToZ(z) *
			this.ZGradient_RespectToWi(x)
		);
	}

	public CostGradient_RespectToBias(
		network: number[],
		dataset: number[],
		z: number
	): number {
		return (
			this.CostGradient_RespectToPredicted(network, dataset) *
			this.PredictedGradient_RespectToZ(z)
		);
	}
}

export const gradient = new Gradient();
export { Gradient };
