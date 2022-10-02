const socket = io('http://localhost:3001');

socket.on('connection');
let id = 0;

let currentMessage = {};

const sendMessage = isErrorMessageSend => {
	const message = document.getElementById('input_message').value;
	const errorToggle = document.getElementById('input_error').checked;

	let data = {
		message: message,
		id: id
	};

	if (isErrorMessageSend) {
		data = currentMessage
	}

	currentMessage = data;

	id++

	if (errorToggle) {
		data.error = true;
	}

	socket.emit('trial_event', data);
};

socket.on('return_message', data => {
	if (data.message) {
		document.querySelector('h1').innerHTML += `<p>${data.id} - ${data.message} -> PACOTE CHEGOU</p>`;
	}
});

socket.on('error_return', () => {
	sendMessage(true);
})
