export function output(output: number[]): {
	networkChoice: string;
	output: string;
} {
	const sumOutput: number = output.reduce((acc, val) => acc + val, 0);
	const confidencePercent: number[] = output.map(
		value => (value / sumOutput) * 100
	);
	const outputs: string[] = new Array();
	output.forEach((value, index) => {
		outputs.push(
			`${index}: Confidence: ${confidencePercent[index]
				.toFixed(2)
				.padStart(5, ' ')}%`
		);
	});
	const outputString = outputs.join('\n');
	console.log(outputString);
	return {
		output: outputString,
		networkChoice: String(output.indexOf(Math.max(...output))),
	};
}
