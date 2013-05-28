(function() {
	var simple = require("./components/simple/routes.js"),
		Users = require("./components/users/index.js");

	module.exports = {
		load: function(app, dbs) {
			var users = Users.init(dbs["sampleUsers"]);

			app.post("/createUser", users.api.create);
			app.get("/createUser", users.api.create);
			app.get("/listUsers", users.api.list);
			app.get("/deleteUsers", users.api.del);
			app.get("/hello", simple.helloWorld);
		}
	};
}());