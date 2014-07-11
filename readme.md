Initial Template for App development with JavaScript in node.js
==============================================================

## Init

Init is a customizable set of templates for several technologies in JavaScript, including:
 
 * [node.js](http://nodejs.org/)
 * [express.js](http://expressjs.com/)
 * [HTML 5 boilerplate](http://html5boilerplate.com/)
 * [Twitter Bootstrap](http://getbootstrap.com/2.3.2/)
 * [Backbone.js](http://backbonejs.org/)
 * [Marionette.js](http://marionettejs.com/)

## How to Use It

First we create our repository (or we use our existing ones)

	git init

Next lets add a git remote with the init repo

	git remote add init git://github.com/picanteverde/init.git

After that we pull the branches we need for example to have the latest version of the user manager

	git pull init usermanager
	
now you can start your application with a working environment


## Removing the init repo

If you want you can delete the init remote

	git remote remove init

## Starting the server

To start the init application (you need [node and npm](http://nodejs.org/)) just do a

	npm install
	node server

on the base folder 


## Pushing your app to Heroku

If you want to see your application working on Heroku pull the heroku-webprocess branch

    git pull init heroku-webprocesss

now, with the heroku [Toolbelt](https://devcenter.heroku.com/articles/nodejs) installed create the heroku app

    heroku create

For the next step make sure you added your .ssh pub key to your heroku account

    git push heroku master

you will be notified with the url of your app running on heroku cedar stack

