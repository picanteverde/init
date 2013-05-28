(function() {
	var userModel = require("./models/user"),
		api = require("../../libs/APICreator.js");

	module.exports = {
		init: function(db) {
			var component = {
				create: function(user, cb) {
					userModel.validate(user, function(err, usr) {
						var user;
						if (err) {
							cb(err);
						} else {
							user = userModel.normalize(usr);
							if (db.kv(user.id)) {
								cb(["User already exists"]);
							} else {
								db.kv(user.id, user, cb);
							}
						}
					});
				},
				list: function(cb) {
					var users = db.getDb(),
						user,
						usersList = [];
					for (user in users) {
						usersList.push({
							id: users[user].id,
							username: users[user].username
						});
					}
					cb(undefined, usersList);
				},
				del: function(user, cb){
					var users;
					user.id = user.id.toLowerCase();
					users = db.getDb();
					if(users[user.id]){
						delete users[user.id];
						db.save(cb);
					}else{
						cb();
					}
				}
			};
			component.api = api.createAPI(component);
			return component;
		}
	};
}());