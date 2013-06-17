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
		alert($(e.target).html());
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

});
var app = new demo.App();

app.addRegions({
	"mainRegion": "#application"
});

app.addInitializer(function(){
	app.layout = new demo.Layout();
	app.mainRegion.show(app.layout);
	app.layout.menu.show(new demo.Menu());
	app.layout.content.show(new demo.Hello());
	
});

app.start();