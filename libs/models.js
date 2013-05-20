(function(){
	module.exports = {
		check: function(obj){
			var errors = [],
				e = function(){
					errors.push(Array.prototype.join.apply(arguments,[""]));
				};

			errors.notFalsy = function (property){
				if(!obj[property]){
					e("Property[", property, "] shouldn't be falsy");
				}
				return this;
			};
			errors.isString = function (property){
				if(typeof (obj[property]) !== "string"){
					e("Property[", property, "] should be a string");
				}
				return this;
			};
			errors.isNumber = function (property){
				if(typeof (obj[property]) !== "number"){
					e("Property[", property, "] should be a string");
				}
				return this;
			}
			return errors;
		},
		normalize: function(obj){
			var ret = {};
			return {
				copy: function(){
					var idx, member;
					for(idx in arguments){
						member = arguments[idx];
						ret[member] = obj[member]; 
					}
					return this;
				},
				toLower: function(member){
					ret[member] = ret[member].toLowerCase();
					return this;
				},
				toUpper: function(member){
					ret[member] = ret[member].toUpperCase();
					return this;
				},
				toSlang: function(member, toMember){
					ret[toMember] = ret[member].replace(/\s+/g, '-');
					this.toLower(toMember);
					return this;
				},
				end: function(){
					return ret;
				}
			};
		}
	}; 
}());