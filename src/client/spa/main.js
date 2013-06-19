demo.app = new demo.App();

demo.app.addRegions({
	"mainRegion": "#application"
});

demo.app.addInitializer(function(){
	this.init();
});

demo.app.start();