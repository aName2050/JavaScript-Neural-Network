export function output(output: number[]): string {
	const sumOutput: number = output.reduce((acc, val) => acc + val, 0);
	const confidencePercent: number[] = output.map(
		value => (value / sumOutput) * 100
	);
	const outputs: string[] = new Array();
	output.forEach((value, index) => {
		// console.log(
		// 	`${index}: Confidence: ${confidencePercent[index]
		// 		.toFixed(2)
		// 		.padStart(6, ' ')}% (RAW:${value})`
		// );
		outputs.push(
			`${index}: Confidence: ${confidencePercent[index]
				.toFixed(2)
				.padStart(5, ' ')}% (RAW:${value})`
		);
	});
	const outputString = outputs.join('\n');
	console.log(outputString);
	return outputString;
}
