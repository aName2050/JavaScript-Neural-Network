window.onload = () => {
	const canvas = document.getElementById('canvas');
	let buttons = [];
	for (let i = 0; i < 784; i++) {
		buttons.push(
			'<button class="pixel" onclick="handleDraw(this)"></button>'
		);
	}
	canvas.innerHTML = buttons.join('');
};
let mousedown = false;
window.addEventListener('mousedown', () => {
	mousedown = true;
});
window.addEventListener('mouseup', () => {
	mousedown = false;
});

// TODO: handle new canvas with buttons

/**
 *
 * @param {HTMLButtonElement} px
 */
function handleDraw(px) {
	if (px.classList.contains('active')) {
		px.classList.remove('active');
	} else {
		px.classList.add('active');
	}
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

document.getElementById('predict').addEventListener('click', async () => {
	const input = getImageData();
	const response = await fetch('/api/v2/nn/predict', {
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

document.getElementById('clear').addEventListener('click', async () => {
	const pixels = document.getElementsByClassName('pixel');
	for (let i = 0; i < pixels.length; i++) {
		pixels[i].classList.remove('active');
	}
});
