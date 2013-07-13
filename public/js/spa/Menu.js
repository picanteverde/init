define([
	"spa/templates"
	],
	function(templates){
		var Menu = Backbone.Marionette.ItemView.extend({
			initialize: function(){
				this.app = this.options.app;
			},
			template: function(){
				return window.JST["menu.html"];
			},
			events:{
				"click li": "goto"
			},
			onRender: function(){
				this.menuOpts = this.$el.find("ul.nav li");
			},
			goto: function(e){
				var elem = this.$(e.target),
					option = elem.attr("href").substr(1);
				e.preventDefault();
				this.menuOpts.removeClass("active");
				elem.parent().addClass("active");
				switch(option){
					case "login":
						this.app.showLoginForm();
						break;
					case "home":
						this.app.showHome();
						break;
				}
			}
		});
		return Menu;
	});