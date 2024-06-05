class NNActivation {
	public Sigmoid = (z: number): number => {
		return 1 / (1 + Math.pow(Math.E, -z));
	};

	public Linear = (x: number): number => {
		return x;
	};

	public Tanh = (x: number): number => {
		return 2 / (1 + Math.pow(Math.E, -2 * x)) - 1;
	};

	public ReLU = (z: number): number => {
		return Math.max(0, z);
	};

	public LeakyReLU = (x: number): number => {
		return Math.max(0.01 * x, x);
	};
}

export const ActivationFunctions = new NNActivation();

class NNActivationDerivative {
	public Sigmoid = (z: number): number => {
		return (
			ActivationFunctions.Sigmoid(z) *
			(1 - ActivationFunctions.Sigmoid(z))
		);
	};

	public Linear = (_x: number): number => {
		return 1;
	};

	public Tanh = (x: number): number => {
		return 1 - Math.pow(ActivationFunctions.Tanh(x), 2);
	};

	public ReLU = (x: number): number => {
		return x < 0 ? 0 : 1;
	};

	public LeakyReLU = (x: number): number => {
		return x < 0 ? x : 1;
	};
}

export const Derivatives = new NNActivationDerivative();

export { NNActivation, NNActivationDerivative };

export enum ActivationFunction {
	Sigmoid,
	Linear,
	Tanh,
	ReLU,
	LeakyReLU,
}

export const ActivationFunctionDictionary: Record<
	ActivationFunction,
	(x: number) => number
> = {
	[ActivationFunction.Sigmoid]: ActivationFunctions.Sigmoid,
	[ActivationFunction.Linear]: ActivationFunctions.Linear,
	[ActivationFunction.Tanh]: ActivationFunctions.Tanh,
	[ActivationFunction.ReLU]: ActivationFunctions.ReLU,
	[ActivationFunction.LeakyReLU]: ActivationFunctions.LeakyReLU,
};
