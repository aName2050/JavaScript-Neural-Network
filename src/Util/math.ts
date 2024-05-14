export function Random(max: number, min: number): number {
	return Math.random() * (max - min + 1) + min;
}
