Initial Commits for App development with JavaScript in node.js
==============================================================


## How to Use It

First we crate our repository (or we use our existing ones)

	git init

Next lets add a git remote with the init repo

	git remote add init git://github.com/picanteverde/init.git

Afert that we have to option one is fetch all init branchs or just pull the branchs we want

So lets try to use marionettejs with twitter-bootstrap

First we bring [marionettejs](http://marionettejs.com/) to our master branch

	git pull init marionettejs
	
Next we add another branch to our master in this case [twitter-bootstrap](http://twitter.github.io/bootstrap/)

	git pull init twitter-bootstrap

Like in this case we can have some conflicts, that we are going to try to keep at minimum

In this case we just have in the index.html the conflict with the js libraries so we just remove the git conflict lines 

	<<<<<<< HEAD
		<script src="js/vendor/underscore.js"></script>
		<script src="js/vendor/backbone.js"></script>
		<script src="js/vendor/backbone.marionette.js"></script>
		<script src="js/spa/main.js"></script>
	=======
        <script src="js/vendor/bootstrap.min.js"></script>

	>>>>>>> 13f0384e8f5b22f733b973497dd0d0cd5d411b94

To

		<script src="js/vendor/underscore.js"></script>
		<script src="js/vendor/backbone.js"></script>
		<script src="js/vendor/backbone.marionette.js"></script>
		<script src="js/spa/main.js"></script>
        <script src="js/vendor/bootstrap.min.js"></script>

And then 

	git add public/index.html

To finish with a 

	git commit

Now you are ready to start with your project

If you want you can delete the init remote

	git remote remove init
	
To start the init application (you need [node and npm](http://nodejs.org/)) just do a

	npm install
	node server

on the base folder 
