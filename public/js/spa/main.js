this["JST"] = this["JST"] || {};

this["JST"]["hello.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<h1>Hello App!</h1>';}return __p};

this["JST"]["layout.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="app">\n\t<div id="menu"></div>\n\t<div id="content"></div>\n</div>';}return __p};

this["JST"]["login.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<div class="login form">\n\t<div class="message">\n\t</div>\n\t<div class="field username">\n\t\t<span class="label username">Username</span>\n\t\t<input type="text" class="input username" />\n\t</div>\n\t<div class="field password">\n\t\t<span class="label password">Password</span>\n\t\t<input type="password" class="input password" />\n\t</div>\n\t<div class="footer">\n\t\t<input type="button" class="btn login" value="Login" />\n\t</div>\n</div>';}return __p};

this["JST"]["menu.html"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<ul class="nav">\n<li class="login">Login</li>\n<li class="signup">Sign Up</li>\n</ul>';}return __p};
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
		"click li": "alertit"
	},
	alertit: function(e){
		if(e.target.className === "login"){
			demo.app.showLoginForm();
		}
	}
});
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