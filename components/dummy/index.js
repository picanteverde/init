(function(){
	module.exports = {
		ok: function(req, res, next){
			res.json({
						"status": "ok"
					});
		}
	};
}());