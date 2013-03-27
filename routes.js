(function(){
	var simple = require("./components/simple/routes.js");

	module.exports = {
		load: function(app, dbs){
			
			app.get("/hello", simple.helloWorld);
		}
	};
}());