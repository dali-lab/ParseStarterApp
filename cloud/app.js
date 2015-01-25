/*----------------*\
This is an express.js backend for
any dynamic backend functionality that Parse doesn't do
largely you don't need to do this unless you are doing something complicated
this supports longer running functions than Parse cloud code

in this context all this does in inject additional meta open graph tags
when handling the '/show/:id' route so that you can share individual items
on facebook -- since facebook sharing does not evaluate any javascript so the
javascript frontend routes never get executes.  this is a workaround as much
as https://prerender.io/ is another one
\*----------------*/



// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
// app.use(express.bodyParser());    // Middleware for reading request body

app.locals.parseApplicationId = 'INSERT_PARSE_APPLICATION_ID';
app.locals.parseJavascriptKey = 'INSERT_PARSE_JAVASCRIPT_KEY';

app.locals.facebookApplicationId = 'INSERT_FACEBOOK_APP_ID';

// Setup underscore to be available in all templates
app.locals._ = require('underscore');

// set up public static files
// only when running locally though
if (process.env) {
  app.use(express.static(__dirname + '/../public'));
}



// route for showing a particular document, fetch this first so we can do the right opengraph tags
app.get('/show/:id', function(req, res) {

  var Document = Parse.Object.extend("Document");
  var query = new Parse.Query(Document);
  var model = {};
  var author = {};
  query.get(req.params.id).then(function(object) {
    model = object;
    return object;
  }).then(function(objectAgain) {
    var authorobj =  objectAgain.get('author');
    var query = new Parse.Query(Parse.User);
    return query.get(authorobj.id);
  }).then(function(author){
    res.render('index', {model: model, author: author} );
  },function(error) {
    res.render('index', {model: false, author: false} );
  });

});


// serve index.html for all remaining routes, in order to leave routing up to backbone
app.all("/*", function(req, res, next) {
    res.render('index', {model: false, author: false} );
});

// Attach the Express app to Cloud Code.
if (process.env) { //when runninbg locally run on port 3000
  app.listen(3000);
} else {
  app.listen();
}
