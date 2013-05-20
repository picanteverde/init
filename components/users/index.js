(function(){
	var userModel = require("./models/user");
	module.exports = {
		init: function(db){
			var component = {
					createUser: function(user, cb){
						userModel.validate(user, function(err, usr){
							var user;
							if(err){
								cb(err);
							}else{
								user = userModel.normalize(usr);
								if(db.kv(user.id)){
									cb(["User already exists"]);
								}else{
									db.kv(user.id, user, cb);
								}
							}
						});
					},
					listUsers: function(){
						var users = db.getDb(),
							user,
							usersList = [];
						for(user in users){
							usersList.push({
								id: users[user].id,
								username: users[user].username
							});
						}
						return usersList;
					}
				},
				api = {
					postCreateUser: function(req, res, next){
						component.createUser(
							req.body,
							function(err){
								if(err){
									res.status(500);
									res.json({
										"error": err
									});
								}else{
									res.json({
										"status": "ok"
									});
								}
							});
					},
					getCreateUser: function(req, res, next){
						component.createUser(
							req.query,
							function(err){
								if(err){
									res.status(500);
									res.json({
										"error": err
									});
								}else{
									res.json({
										"status": "ok"
									});
								}
							});
					},
					listUsers: function(req, res, next){
						res.json(component.listUsers());
					}
				};
			component.api = api;
			return component;
		}
	};
}());