(function(){
	module.exports = {
		validate: function(user){
			var errors = "";
			if(typeof(user.username) !== "string"){
				errors += "Username should be a string|";
			}

			if(errors.length > 0){
				return errors.slice(0, -1);
			}
		},
		normalize: function(user){
			user.username = user.username.toLowerCase();
			return user;
		}
	};
}());