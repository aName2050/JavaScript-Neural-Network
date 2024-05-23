export function output(output: number[]): void {
	const sumOutput: number = output.reduce((acc, val) => acc + val, 0);
	const confidencePercent: number[] = output.map(
		value => (value / sumOutput) * 100
	);

	output.forEach((value, index) => {
		console.log(
			`Output ${index + 1}: ${value}, Confidence: ${confidencePercent[
				index
			].toFixed(2)}%`
		);
	});
}
