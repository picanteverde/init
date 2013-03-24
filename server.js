var express = require("express"),
	routes = require("./routes.js"),
	app = express(),
	port = process.env.PORT || 5000,
	public_dir = process.env.PUBLIC_DIR || "public";

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