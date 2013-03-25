var templates = {
		"formView": "<h2>New User</h2><p>Name: <input type=\"text\" id=\"name\" /></p><p>Age: <input type=\"text\" id=\"age\" /></p><p><button>Create</button></p>",
		"userView": "<p>Name: <%= name %></p><p>Age: <%= age %></p>",
		"usersView": "<h2>Users</h2>",
		"noUsersView": "<h2>No Users</h2>"

	},
	app = new Backbone.Marionette.Application();
app.addRegions({
	"mainRegion": "#application"
});