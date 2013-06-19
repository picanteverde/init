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