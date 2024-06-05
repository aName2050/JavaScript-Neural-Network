window.onload = async () => {
	const canvas = document.getElementById('canvas');
	let buttons = [];
	for (let i = 0; i < 784; i++) {
		buttons.push('<button class="pixel"</button>');
	}
	canvas.innerHTML = buttons.join('');

	let isDrawing = false;

	const pixelButtons = document.querySelectorAll('button.pixel');
	pixelButtons.forEach(px => {
		px.addEventListener('mousedown', () => {
			isDrawing = true;
			handleDraw(px);
		});

		px.addEventListener('mousemove', () => {
			if (isDrawing) handleDraw(px);
		});

		px.addEventListener('mouseup', () => {
			isDrawing = false;
		});
	});

	canvas.addEventListener('mouseleave', () => {
		isDrawing = false;
	});

	document.addEventListener('mouseup', () => {
		isDrawing = false;
	});

	getStatus();
};

/**
 *
 * @param {HTMLButtonElement} px
 */
function handleDraw(px) {
	px.classList.add('active');
}

function getImageData() {
	let pixels = [];

	const pixelElements = document.getElementsByClassName('pixel');
	for (let i = 0; i < pixelElements.length; i++) {
		if (pixelElements[i].classList.contains('active')) pixels.push(1);
		else pixels.push(0);
	}

	return pixels;
}

async function getStatus() {
	const response = await fetch('/api/v2/nn/status', {
		method: 'GET',
	});
	const result = (await response.json()).status;
	// type NetworkState =
	// | 'NOT_READY'
	// | 'READY_FOR_TRAINING'
	// | 'TRAINING'
	// | 'READY_FOR_PREDICTING'
	// | 'PREDICTING';
	let out;
	switch (result) {
		case 'NOT_READY':
			out = 'Network is not ready yet';
			break;
		case 'READY_FOR_TRAINING':
			out = 'Network is ready for training';
			break;
		case 'TRAINING':
			out = 'Please wait, the network is training';
			break;
		case 'READY_FOR_PREDICTING':
			out = 'The network is ready!';
			break;
		case 'PREDICTING':
			out = 'Waiting for network response...';
			break;
		default:
			out = 'Unknown network state';
			break;
	}
	document.getElementById('result').innerText = `${out}`;
}

document.getElementById('predict').addEventListener('click', async () => {
	const input = getImageData();
	const response = await fetch('/api/v2/nn/predict', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ input }),
	});

	const result = JSON.parse(await response.json());

	document.getElementById(
		'result'
	).innerText = `Prediction: \n${result.networkChoice}\n\nNetwork Confidence: \n${result.output}`;
});

document.getElementById('clear').addEventListener('click', async () => {
	const pixels = document.getElementsByClassName('pixel');
	for (let i = 0; i < pixels.length; i++) {
		pixels[i].classList.remove('active');
	}
});

document.getElementById('beginTraining').addEventListener('click', async () => {
	const response = await fetch('/api/v2/nn/train', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const result = await response.json();

	document.getElementById('result').innerText = `${result.message}`;
});

document
	.getElementById('checkTrainingStatus')
	.addEventListener('click', async () => {
		getStatus();
	});
