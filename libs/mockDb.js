(function () {
	var kvStore = require("./kvStore.js");
	module.exports = {
		"connect": function (url, cb){
			var arr = url.split(":"),
				type = arr[0];
			switch(type){
				case "file":
					kvStore.connectDb(arr[1], cb);
				break;
				default:
				cb("Error: Unknown Type " + url + " Usage: [type]:[url] ");
			}
		}
	};
}());