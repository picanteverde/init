(function(){
	module.exports = {
		init: function(db){
			var component = {
					createUser: function(username, password, cb){
						var errs = []
						if(!username){
							errs.push("username not defined");
						}
						if(!password){
							errs.push("password not defined");
						}
						if(errs.length === 0){
							db.kv(username, {
								username: username,
								password: password
							},cb);
						}else{
							cb(errs);
						}
					},
					listUsers: function(){
						var users = db.getDb(),
							user,
							usersList = [];
						for(user in users){
							usersList.push(user);
						}
						return usersList;
					}
				},
				api = {
					createUser: function(req, res, next){
						var username = req.body.username,
							password = req.body.password;

						if(username && password){
							component.createUser(
								username, 
								password,
								function(err){
									if(err){
										res.status(500);
										res.json({
											"error": err
										});
									}else{
										res.json({
											"username": username,
											"password": password
										});
									}
								});
						}else{
							res.status(500);
							res.json({
								"error": "Username and Password required"
							});
						}
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