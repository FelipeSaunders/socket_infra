const express = require('express');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
	cors: {
		origin: '*'
	}
});

server.listen(3001, () => {
	console.log('server running...');
})

io.on('connection', socket => {
	console.log('User connected: ', socket.id);

	socket.on('trial_event', data => {
		console.log('teste de reenvio de mensagem no caso de erro')
		const returnMessage = {
			id: data.id,
			message: data.message
		};

		if (!data.error) {
			socket.broadcast.emit('return_message', returnMessage);
			return;
		} else if (data.error) {
			const errorData = {
				id: data.id
			};

			socket.broadcast.emit('error_return', errorData);
		}
	});
});

