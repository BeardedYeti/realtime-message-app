const room = 'Javascript';
const socket = io('/dev');
$('form').submit(() => {
	let msg = $('#m').val();
	socket.emit('message', { msg, room });
	$('#m').val('');
	return false;
});
socket.on('connect', () => {
	// Emit All
	socket.emit('join', { room });
});
socket.on('message', (msg) => {
	$('#messages').append($('<li>').text(msg));
});
