demo.Login = Backbone.Marionette.ItemView.extend({
	template: function(){
		return window.JST["login.html"];
	},
	events:{
		"click input.btn.login": "login"
	},
	ui: {
		username: "input.username",
		password: "input.password",
		message: "div.message"
	},
	login: function(){
		var that = this;
		demo.app.login(
			this.ui.username.val(),
			this.ui.password.val(),
			function(err){
				that.ui.message.html(err);
			},
			function(){
				that.ui.message.html("YUPI you are logged in!");	
			});
	}
});