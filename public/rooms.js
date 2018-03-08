let room;
const url = window.location.pathname;

switch (url) {
	case '/javascript':
		room = 'Javascript';
		break;
	case '/python':
		room = 'Python';
		break;
	case '/php':
		room = 'Php';
		break;
	case '/java':
		room = 'Java';
		break;
	case '/csharp':
		room = 'C#';
		break;
	case '/html':
		room = 'HTML';
		break;
	case '/css':
		room = 'CSS';
		break;
	default:
		room = 'general';
		break;
};

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
