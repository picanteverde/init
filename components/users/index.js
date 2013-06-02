(function() {
	var JsSHA = require('../../libs/sha1'),
		userModel = require("./models/user"),
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
				read: function(user, cb){
					var usr = db.kv(user.id);
					if(!usr){
						cb(["User not found"]);
					}else{
						cb(undefined, usr);
					}
				},
				update: function(user, cb){
					userModel.validateUpdate(user, function(err, usr){
						var user;
						if(err){
							cb(err);
						}else{
							user = userModel.normalize(usr);
							if(user.id !== usr.oldId){
								if(db.kv(user.id)){
									cb(["User already exists"]);
								}else{
									db.del(usr.oldId, function(err){
										if(err){
											cb(err);
										}else{
											db.kv(user.id, user, cb);
										}
									});
								}
							}else{
								db.kv(user.id, user, cb);
							}
						}
					});
				},
				del: function(user, cb){
					user.id = user.id.toLowerCase();
					db.del(user.id, cb);
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
				}
			};
			component.api = api.createAPI(component);
			return component;
		}
	};
}());