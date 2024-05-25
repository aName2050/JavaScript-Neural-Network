const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => {
	drawing = true;
});

canvas.addEventListener('mouseup', () => {
	drawing = false;
	ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);

function draw(event) {
	if (!drawing) return;

	ctx.lineWidth = 10;
	ctx.lineCap = 'round';

	ctx.lineTo(
		event.clientX - canvas.offsetLeft,
		event.clientY - canvas.offsetTop
	);
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(
		event.clientX - canvas.offsetLeft,
		event.clientY - canvas.offsetTop
	);
}

function getImageData() {
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	const data = imageData.data;
	const grayscale = [];

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i];
		const g = data[i + 1];
		const b = data[i + 2];
		const gray = (r + g + b) / 3;
		grayscale.push(gray / 255); // Normalize to [0, 1]
	}

	console.log(grayscale);

	return grayscale;
}

document.getElementById('predict').addEventListener('click', async () => {
	const input = getImageData();
	const response = await fetch('http://localhost:8000/api/v2/nn/predict', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ input }),
	});

	const result = await response.json();
	document.getElementById(
		'result'
	).innerText = `Prediction: ${result.prediction}`;
});
