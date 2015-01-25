# ParseStarterApp

This is HTML5 application, built with [Brunch](http://brunch.io) and [Parse.com](http://parse.com).  It uses Brunch as its build tool and bower for dependencies. It has an Expressjs app that runs in Parse for handling some custom routes for Facebook sharing. 

## Getting started (on osx)
* Install (run commands in Terminal):
	* [Brew] (http:brew.sh):  opensource package manager for OS X
    * [Node.js](http://nodejs.org): `brew install node` 
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * `cd YourCloneDirectory`
    * Install node and brunch depencies: `npm install`
    * Install bower packages: `bower install`
* Configure:
	* Edit:  cloud/app.js, config/global.json, initialize.js
	and change the lines with INSERT_PARSE_APPLICATION_ID, and INSERT_PARSE_JAVASCRIPT_KEY
	to your parse keys that you get by creating an account on Parse.com. 
	* In initialize.js and cloud/app.js change the INSERT_FACEBOOK_APP_ID to use your facebook app id after you create your facebook app on developer.facebook.com.
	* When creating your facebook app, set your site url to: http://localhost:3000 or add localhost to your app domains  (this helps for testing locally). 
* Run:
	* `npm start` — starts a continuous rebuild local server that runs [locally](http://localhost:3000/)	
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server *do not edit anything in this dir*
    * Write your code in the `app/` dir.
    * Place static files into `app/assets/` these will be automatically copied to `public/`. So `app/assets/logo.jpg -> http://localhost:3000/logo.jpg`
    * `app/views` contains javascript frontend backbone/parse views.  These are where the majority of frontend functionality happens.  Each view is a logic frontend component such as a login window or a post.  A view typically renders a template using some extra logic. 
    * `app/templates` contains templates for the views.  These are javascript templates (ejs or underscore templates).  They basically just allow arbitrary javascript within `<% %>` brackets. Note how they are executed in the views where you can pass in a json object to populate the namespace of the template. 
    * `app/routers` contains at least one file with backbone/parse frontend routes.
    * `app/models` contains backbone/parse models.  These define data objects that are connected to the Parse service. They may have some extra functionality such as verification or on save actions.
    * `app/collections`  contains backbone/parse collection definitions.  These are collections of some model.  They can have extra functionality such as pagination of search results for instance.
    * `app/css` contains scss files.  [Sass](http://sass-lang.org) is a css extension language that is more powerful than plain css.  Among other things they allow variables and nesting.  Typically each logical unit (maybe each view) gets its own scss file which only styles things within a partical class or id.
    * `cloud/views/index.js`  is the main entry file for the site.  It defines a very basic layout and some extra functionality for loading in custom non-javascript backend driven content.
    * `app/initialize.js` is the main javascript entry point for the site.  Here you would load in various views and models and define a global scope for the app.  
    * `cloud/app.js`  is the express extra dynamic content functionality for the app.  Typically you don't need to do much here unless you want to share your content on facebook.
    * `cloud/main.js` has some cloud code functions for the app.  This can run methods that extend on Parse functionality on the backend. For instance you can run a beforeSave hook that can do extra work on your object before saving it to the Parse data storage.
    * `config/global.json` contains your Parse app keys and id so that you can deploy your app to Parse hosting. 
    * `package.json` is the config file for npm dependencies and defines the app as an npm module.  If you need to add node/brunch modules just do: `npm install packagename --save`
    * `brunch-config.coffee` is the config file for the brunch build system. Brunch is used to compile the site, constructing javascript files and css files from the files in `app/` and building out `public/`.
    * `bower.json` is the config file for the bower frontend javascript dependencies. If you add javascript modules to run on the frontend just do:  `bower install packagename --save`
    * any other files are either dependencies or generated files you probably don't need.  
* Publish to Parse Hosting:   `npm run-script deploy`

