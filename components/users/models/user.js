(function(){
	var model = require("../../../libs/models"),
		check = model.check,
		normalize = model.normalize;
	module.exports = {
		validate: function(obj, cb){
			var errors = check(obj).notFalsy("username").notFalsy("password").isString("username").isString("password");
			if(errors.length === 0){
				errors = undefined;
			}
			cb(errors, obj);
		},
		normalize: function(obj){
			return normalize(obj).copy("username", "password").toLower("username").toSlang("username", "id").end();
		},
		validateUpdate: function(obj, cb){
			var errors = check(obj).notFalsy("oldId").notFalsy("username").notFalsy("password").isString("oldId").isString("username").isString("password");
			if(errors.length === 0){
				errors = undefined;
			}
			cb(errors, obj);		
		}
	};
}());