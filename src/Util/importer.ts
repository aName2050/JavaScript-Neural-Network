import * as JSON_0 from '../../Config/MNIST/digits/0.json';
import * as JSON_1 from '../../Config/MNIST/digits/1.json';
import * as JSON_2 from '../../Config/MNIST/digits/2.json';
import * as JSON_3 from '../../Config/MNIST/digits/3.json';
import * as JSON_4 from '../../Config/MNIST/digits/4.json';
import * as JSON_5 from '../../Config/MNIST/digits/5.json';
import * as JSON_6 from '../../Config/MNIST/digits/6.json';
import * as JSON_7 from '../../Config/MNIST/digits/7.json';
import * as JSON_8 from '../../Config/MNIST/digits/8.json';
import * as JSON_9 from '../../Config/MNIST/digits/9.json';

export interface DataStructure {
	'input': number[];
	'output': number[];
}

export interface Dataset {
	'data': DataStructure[];
}

export class MNIST {
	private RAW: number[][];
	public DATASET: Dataset['data'];

	constructor() {
		this.RAW = [];
		this.DATASET = [];
	}

	public preprocess(): void {
		this.RAW.push(JSON_0.data);
		this.RAW.push(JSON_1.data);
		this.RAW.push(JSON_2.data);
		this.RAW.push(JSON_3.data);
		this.RAW.push(JSON_4.data);
		this.RAW.push(JSON_5.data);
		this.RAW.push(JSON_6.data);
		this.RAW.push(JSON_7.data);
		this.RAW.push(JSON_8.data);
		this.RAW.push(JSON_9.data);

		// this.DATASET = this.process(this.RAW);
	}

	// TODO: implement pre-processing to MNIST dataset
}
