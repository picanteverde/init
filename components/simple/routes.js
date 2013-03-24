(function(){
	module.exports = {
		helloWorld: function(req, res, next){
			var body = "Hello World";
			res.setHeader("Content-Type", "text/plain");
			res.setHeader("Content-Length", body.length);
			res.end(body);
		}
	};
}());