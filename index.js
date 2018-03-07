const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.sendFile('index.html');
});

io.on('connection', (socket) => {
	console.log('user connected');
	socket.on('message', (msg) => {
		console.log(`message: ${msg}`);
		io.emit('message', msg);
	})
})