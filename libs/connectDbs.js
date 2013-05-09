(function(){
	var pg = require("pg"),
		mongo = require("mongodb"),
		mock = require("./mockDb"),
		connectTo = function(name, conn, error, success){
			var drv,
				cb = function(err, client, done){
						if(err){
							error(name, err);
						}else{
							success(name, client, done);
						}
					};
			switch(conn.type){
				case "postgres":
					drv = pg.connect(conn.url, cb);
					break;
				case "mongodb":
					drv = mongo.Db.connect(conn.url, cb);
					break;
				case "mock":
					drv = mock.connect(conn.url, cb);
					break;
			}
		};

	module.exports = {
		"connect": function(dbs, cb, timeout){
			var db,
				i = 0,
				j = 0,
				clients = {},
				errors = {},
				error = function(name, err){
					errors[name] = err;
				},
				success = function (name, client, done){
					j += 1;
					clients[name] = client;
					client.done = done;
					if(j === i){
						clearTimeout(timeout);
						cb(null, clients);
					}
				};
			timeout = timeout || 1000;

			if(typeof(cb) !== "function"){
				console.log("ConnectDb called without callback!");
				return;
			}
			for (db in dbs){
				i += 1;
				connectTo(db, dbs[db], error, success);
			}
			timeout = setTimeout(function(){
				if(Object.keys(errors).length === 0){
					errors = null;
				}
				cb(errors);
			},timeout);
		}
	};
}());