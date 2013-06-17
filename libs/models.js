(function(){
	var cheking = {
			e: function(){
				this.push(Array.prototype.join.apply(arguments,[""]));
			},
			notFalsy: function (property){
				if(!this.obj[property]){
					this.e("Property[", property, "] shouldn't be falsy");
				}
				return this;
			},
			isString: function (property){
				if(typeof (this.obj[property]) !== "string"){
					this.e("Property[", property, "] should be a string");
				}
				return this;
			},
			isNumber: function (property){
				if(typeof (this.obj[property]) !== "number"){
					this.e("Property[", property, "] should be a string");
				}
				return this;
			}
		},
		normalize = {
			copy: function(){
				var idx, member;
				for(idx in arguments){
					member = arguments[idx];
					this.ret[member] = this.obj[member]; 
				}
				return this;
			},
			toLower: function(member){
				this.ret[member] = this.ret[member].toLowerCase();
				return this;
			},
			toUpper: function(member){
				this.ret[member] = this.ret[member].toUpperCase();
				return this;
			},
			toSlang: function(member, toMember){
				this.ret[toMember] = this.ret[member].replace(/\s+/g, '-');
				this.toLower(toMember);
				return this;
			},
			end: function(){
				return this.ret;
			}
		};
	module.exports = {
		check: function(obj){
			var errors = [];
			errors.obj = obj;
			errors.e = cheking.e;
			errors.notFalsy = cheking.notFalsy;
			errors.isString = cheking.isString;
			errors.isNumber = cheking.isNumber;
			return errors;
		},
		normalize: function(obj){
			this.obj = obj;
			this.ret = {};

			this.copy = normalize.copy;
			this.toLower = normalize.toLower;
			this.toUpper = normalize.toUpper;
			this.toSlang = normalize.toSlang;
			this.end = normalize.end;
			return this;
		}
	}; 
}());