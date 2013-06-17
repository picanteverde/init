demo.Layout = Backbone.Marionette.Layout.extend({
  template: function(){
	return window.JST["layout.html"];
  },
  regions: {
    menu: "#menu",
    content: "#content"
  }
});