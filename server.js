var config = require("./config.json"),
	express = require("express"),
	routes = require("./routes.js"),
	app = express(),
	port = process.env.PORT || config.server.port,
	public_dir = process.env.PUBLIC_DIR || config.server.public_dir;

app.configure(function(){

	app.use(express.favicon());
	app.use(express.logger("dev"));

	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());

	app.use(app.router);

	app.use(express["static"](public_dir));

});

app.configure("development", function() {
    app.use(express.errorHandler({
        dumpException: true,
        showStack: true
    }));
});

routes.load(app);

app.listen(port);
console.log("App listening on port: " + port);