var demo = demo || {};
demo.Hello = Backbone.Marionette.ItemView.extend({
	template: function(){
		return window.JST["hello.html"];
	}
});
demo.Menu = Backbone.Marionette.ItemView.extend({
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
				demo.app.showLoginForm();
				break;
			case "home":
				demo.app.showHome();
				break;
		}
	}
});
demo.Login = Backbone.Marionette.ItemView.extend({
	template: function(){
		return window.JST["login.html"];
	},
	events:{
		"click button.btn.login": "login"
	},
	ui: {
		username: "input.username",
		password: "input.password",
		message: "div.message"
	},
	onShow: function(){
		this.ui.username.focus();
	},
	login: function(e){
		var that = this;
		e.preventDefault();
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
demo.Layout = Backbone.Marionette.Layout.extend({
  template: function(){
	return window.JST["layout.html"];
  },
  regions: {
    menu: "#menu",
    content: "#content"
  }
});
demo.App = Backbone.Marionette.Application.extend({
	init: function(){
		this.layout = new demo.Layout();
		this.mainRegion.show(this.layout);
		this.layout.menu.show(new demo.Menu());
		this.layout.content.show(new demo.Hello());
	},
	showLoginForm: function(){
		this.layout.content.show(new demo.Login());
	},
	showHome: function(){
		this.layout.content.show(new demo.Hello());
	},
	login: function(username, password, cbError, cbSuccess){
		var app = this,
			rnd = Math.random() * 1000,
			publicKey = username,
			privateKey = password,
			content = "publicKey=" + publicKey + "&rnd=" + rnd,
			shaObj =  new JsSHA(content, "ASCII");
		$.ajax({
			url: "/api/auth",
			type: "POST",
			dataType: "json",
			data: {
				publicKey: publicKey,
				rnd: rnd,
				signature: shaObj.getHMAC(privateKey, "ASCII", "HEX")

			},
			statusCode: {
				401: function (data){
					data = JSON.parse(data.responseText);
					cbError(data.error);
				}
			},
			success: function(data){
				if(data.error){
					cbError(data.error);
				}else{
					app.loggedIn = true;
					cbSuccess();
				}
			}
		});
	}
});
demo.app = new demo.App();

demo.app.addRegions({
	"mainRegion": "#application"
});

demo.app.addInitializer(function(){
	this.init();
});

demo.app.start();