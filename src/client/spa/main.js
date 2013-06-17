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