class Calculus {
	public DotProduct(inputs: number[], weights: number[]): number {
		return inputs.map((v, i) => v * i).reduce((pV, cV) => pV + cV);
	}
}

export const calculus = new Calculus();
export { Calculus };
