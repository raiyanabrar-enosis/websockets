import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 6969 });

wss.on("connection", function connection(ws, req) {
	const ip = req.socket.remoteAddress;
	console.log("New connection");
	ws.on("error", console.error);

	ws.on("message", function message(data, isBinary) {
		wss.clients.forEach(function each(client) {
			if (ws != client && client.readyState === WebSocket.OPEN) {
				client.send(data, { binary: isBinary });
			}
		});
	});
});
