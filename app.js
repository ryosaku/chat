var express = require("express");
var app     = express();
var io      = require("socket.io")();

app.engine("html", require("ejs").renderFile);
app.get("/", home);
io.listen(app.listen(4000));

function home(req, res) {
	res.render("index.html");
}

io.on("connection", socket => {
	socket.send("Welcome to our chat system");
	socket.on("message", m => {
		var data = m.split("=");

		if (data[0] == "@name") {
			socket.name = data[1];
			io.send(data[1] + " joined.");
		} else {
			io.send(m);
		}
	});
	socket.on("disconnect", () => {
		io.send(socket.name + " leaved.");
	});
});
