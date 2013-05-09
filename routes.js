(function(){
	var simple = require("./components/simple/routes.js"),
		Users = require("./components/users/index.js");

	module.exports = {
		load: function(app, dbs){
			var users = Users.init(dbs["sampleUsers"]);

			app.post("/createUser", users.api.createUser);
			app.get("/listUsers", users.api.listUsers);
			app.get("/hello", simple.helloWorld);
		}
	};
}());