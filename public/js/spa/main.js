define(["spa/App"], function(App){
	var app = new App();

	app.addRegions({
		"mainRegion": "#application"
	});

	app.addInitializer(function(){
		this.init();
	});

	app.start();

	return app;
});