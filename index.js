const app = require('express')();
const express = require('express');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 3000;
const roomsFile = __dirname + '/public/rooms.html';

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});
app.get('/javascript', (req, res) => {
	res.sendFile(roomsFile);
});
app.get('/python', (req, res) => {
	res.sendFile(roomsFile);
});
app.get('/php', (req, res) => {
	res.sendFile(roomsFile);
});
app.get('/java', (req, res) => {
	res.sendFile(roomsFile);
});
app.get('/html', (req, res) => {
	res.sendFile(roomsFile);
});
app.get('/css', (req, res) => {
	res.sendFile(roomsFile);
});
app.get('/csharp', (req, res) => {
	res.sendFile(roomsFile);
});
app.get('/general', (req, res) => {
	res.sendFile(roomsFile);
});

// Developer Namespace
const dev = io.of('/dev');

dev.on('connection', (socket) => {
	socket.on('join', (data) => {
		socket.join(data.room);
		dev.in(data.room).emit('message', `New User Joined ${data.room} Room`);
	});
	socket.on('message', (data) => {
		console.log(`message: ${data.msg}`);
		dev.in(data.room).emit('message', data.msg);
	});
	socket.on('disconnect', () => {
		console.log('User Disconnected');
		dev.emit('message', 'User Disconnected');
	})
})