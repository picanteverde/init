demo.Menu = Backbone.Marionette.ItemView.extend({
	template: function(){
		return window.JST["menu.html"];
	},
	events:{
		"click li": "alertit"
	},
	alertit: function(e){
		alert($(e.target).html());
	}
});