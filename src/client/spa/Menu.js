demo.Menu = Backbone.Marionette.ItemView.extend({
	template: function(){
		return window.JST["menu.html"];
	},
	events:{
		"click li": "alertit"
	},
	alertit: function(e){
		if(e.target.className === "login"){
			demo.app.showLoginForm();
		}
	}
});