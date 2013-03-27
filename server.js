var config = require("./config.json"),
	express = require("express"),
	routes = require("./routes.js"),
	dbs = require("./libs/connectDbs.js"),
	app = express();

config.server.port = process.env.PORT || config.server.port;
config.server.public_dir = process.env.PUBLIC_DIR || config.server.public_dir;

app.configure(function(){

	app.use(express.favicon());
	app.use(express.logger("dev"));

	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.methodOverride());

	app.use(app.router);

	app.use(express["static"](config.server.public_dir));

});

app.configure("development", function() {
    app.use(express.errorHandler({
        dumpException: true,
        showStack: true
    }));
});

dbs.connect(config.dbs, function(errs, clients){
	var db;
	if(errs){
		for(db in errs){
			console.log("Error: db[" + db + "] " + errs[db]);
		}
	}else{
		routes.load(app, clients);
		app.listen(config.server.port);
		console.log("App listening on port: " + config.server.port);
	}
});