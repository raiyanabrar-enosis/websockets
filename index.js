let socket = new WebSocket("ws://localhost:6969");
let username = "Guest";

socket.onopen = function (e) {
	console.log("[open] Connection established");
};

socket.onmessage = function (event) {
	console.log(`[message] Data received from server: ${event.data}`);
	insertMessage(event.data, false);
};

socket.onclose = function (event) {
	if (event.wasClean) {
		console.log(
			`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
		);
	} else {
		alert("[close] Connection died");
	}
};

socket.onerror = function (error) {
	alert(`[error]`);
};

function sendusername(e) {
	e.preventDefault();

	const name = document.querySelector("#name").value;
	username = name;
	socket.send(name + " has joined");

	document.querySelector("#userContent").style.display = "none";
	document.querySelector("#messageContent").style.display = "block";
}

function sendmsg(e) {
	e.preventDefault();

	const msg = document.querySelector("#message").value;
	socket.send(username + ": " + msg);
	document.querySelector("#message").value = "";

	insertMessage(msg, true);
}

function insertMessage(text, self) {
	const msgs = document.querySelector("#messages");
	const outerdiv = document.createElement("div");
	outerdiv.className = "messageItem";
	if (self) {
		outerdiv.className += " self";
	} else {
		outerdiv.className += " other";
	}
	const textelem = document.createElement("span");
	textelem.textContent = text;

	outerdiv.appendChild(textelem);
	msgs.appendChild(outerdiv);
}

document.querySelector("#userform").addEventListener("submit", sendusername);
document.querySelector("#messageform").addEventListener("submit", sendmsg);
