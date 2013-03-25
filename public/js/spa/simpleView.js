var SimpleView =  Backbone.View.extend({
	events: {
		"click div.btn": "helloWorld"
	},
	render: function(){
		this.$el.html("<div class=\"btn\">Say Hello!</div>");
		return this;
	},
	helloWorld: function(e){
		alert("hello world");
	}
});