var exports = module.exports = (function(){
	var fs = require("fs"),
		dbs = {};

	return {
		connectDb: function (path, cb){
			if (dbs[path]===undefined){
				var db={}, 
					obj = {
						save: function(cb){
							if(cb === undefined){
								cb = console.log;
							}
							fs.open(path, 'w', undefined, function (err, fd){
								if(err){
									cb('Error: Cannot open for write [' + fs.realpathSync(path) + '] \n' + err);
									return;
								}
								fs.write(fd, JSON.stringify(db), undefined, undefined, function(err, written){
									if(err){
										cb('Error: Cannot write in [' + fs.realpathSync(path) + '] \n' + err);
										return;
									}
									fs.close(fd, function(err) {
										if(err){
											cb('Cannot close [' + fs.realpathSync(path) + '] \n' + err);
											return;
										}
									});
									cb();
								});
							});							
						},
						kv: function(key, value, cb){
							if(value === undefined){
								return db[key];
							}else{
								db[key] = value;
								this.save(cb);
							}
						},
						del: function(key, cb){
							delete db[key];
							this.save(cb);
						},
						getDb: function(){
							return db;
						}
					};


					fs.lstat(path, function(err, stat){
						if(err){
							dbs[path]=obj;
							cb(obj);
							return;
						}else{
							if (stat.isFile()){
								fs.readFile(path,function(err, data){
									try{
										db = JSON.parse(data);
									}catch(e){
										cb("Error: Bad json: \n" + data + '\n' + e);
									}
									dbs[path]=obj;
									cb(undefined, obj);
								});
							}
						}
					});	
			}else{
				cb(undefined, dbs[path]);
			}
			return;
		}
	};
}());
