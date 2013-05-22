(function() {
	var userModel = require("./models/user"),
		API = require("../../libs/APICreator.js");

	module.exports = {
		init: function(db) {
			var component = {
				createUser: function(user, cb) {
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
				listUsers: function(cb) {
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
				}
			},
				api = API.createAPI(component);
			component.api = api;
			return component;
		}
	};
}());