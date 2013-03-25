(function(){
	var simple = require("./components/simple/routes.js");

	module.exports = {
		load: function(app){
			app.get("/hello", simple.helloWorld);
		}
	};
}());