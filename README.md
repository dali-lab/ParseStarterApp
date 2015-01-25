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
* Run:
	* `npm start` — starts a continuous rebuild local server that runs [locally](http://localhost:3333/)
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    * [Brunch site](http://brunch.io)
