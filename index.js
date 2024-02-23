let socket = new WebSocket("ws://localhost:6969");
let username = "Guest";

socket.onopen = function (e) {
	console.log("[open] Connection established");
};

socket.onmessage = function (event) {
	const msg = JSON.parse(event.data);
	console.log(`[message] Data received from server: ${event.data}`);
	insertMessage(msg.message, false, msg.time, msg.user);
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
	const msgObj = {
		user: username,
		message: username + " has joined",
		time: getCurrentTime(),
	};
	socket.send(JSON.stringify(msgObj));

	document.querySelector("#userContent").style.display = "none";
	document.querySelector("#messageContent").style.display = "block";
}

function sendmsg(e) {
	e.preventDefault();

	const msg = document.querySelector("#message").value;
	const msgObject = {
		user: username,
		message: msg,
		time: getCurrentTime(),
	};
	socket.send(JSON.stringify(msgObject));
	document.querySelector("#message").value = "";

	insertMessage(msg, true, msgObject.time);
}

function insertMessage(text, self, time, user) {
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
	const timeelem = document.createElement("p");
	timeelem.textContent = time;

	const txt = document.createElement("div");
	txt.appendChild(timeelem);
	txt.appendChild(textelem);

	outerdiv.appendChild(txt);

	const msgdiv = document.createElement("div");
	const msguser = document.createElement("p");
	msguser.className = "messageUser";
	msguser.textContent = user;
	msgdiv.appendChild(msguser);
	msgdiv.appendChild(outerdiv);
	msgs.appendChild(msgdiv);
}

function getCurrentTime() {
	const date = new Date();

	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");

	return `${hours}:${minutes}`;
}

document.querySelector("#userform").addEventListener("submit", sendusername);
document.querySelector("#messageform").addEventListener("submit", sendmsg);
