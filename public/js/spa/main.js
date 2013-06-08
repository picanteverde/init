var templates = {
		"formView": "<h2>New Cat</h2><p>Name: <input type=\"text\" id=\"name\" /></p><p>Color: <input type=\"text\" id=\"color\" /></p><p><button>Add</button></p>",
		"catView": "<p>Name: <%= name %>, <%= color %></p>",
		"catsView": "<h2>Cats</h2><div id=\"cats\"></div><button>Add</button>",
		"noCatsView": "<h2>No Cats</h2>"

	},
	app = new Backbone.Marionette.Application(),
	Cat = Backbone.Model.extend({}),
	Cats = Backbone.Collection.extend({
		model: Cat
	}),
	CatView = Backbone.Marionette.ItemView.extend({
		template: function(serializedModel){
			return _.template(templates.catView, serializedModel);
		}
	}),
	NoCatsView = Backbone.Marionette.ItemView.extend({
		template: function(){
			return templates.noCatsView;
		}
	}),
	CatsView = Backbone.Marionette.CompositeView.extend({
		template: function(){
			return templates.catsView;
		},
		itemViewContainer: "#cats",
		itemView: CatView,
		emptyView: NoCatsView,
		events: {
			"click button": "addCats"
		},
		addCats: function(){
			app.showForm();
		}
	}),
	FormView = Backbone.Marionette.ItemView.extend({
		template: function(){
			return templates.formView;
		},
		events: {
			"click button": "createNewCat"
		},
		ui: {
			name: "#name",
			color: "#color"
		},
		createNewCat: function(){
			this.collection.add({
				name: this.ui.name.val(),
				color: this.ui.color.val()
			});
			this.ui.color.val("");
			this.ui.name.val("");
			app.returnToList();
		}
	});


app.addRegions({
	"mainRegion": "#application"
});

app.showForm = function(){
	app.mainRegion.show(new FormView({ collection: app.cats }));
};

app.returnToList = function(){
	app.mainRegion.show(new CatsView({ collection: app.cats}));
};

app.addInitializer(function () {
	app.cats = new Cats();
	app.mainRegion.show(new CatsView({collection: app.cats}));
});

app.start();