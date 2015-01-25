// Initialization
// sets up parse and backbone routing
// ---------------
$(function() {

  Parse.$ = jQuery;

  // Initialize Parse with your Parse application javascript keys before anything else
  Parse.initialize("INSERT_PARSE_APPLICATION_ID", "INSERT_PARSE_JAVASCRIPT_KEY");


  window.App = require('App');

  // a close extension for parse views to prevent ghost views
  Parse.View.prototype.close = function() {    
    if (this.beforeClose) {        
      this.beforeClose();    
    }    
    this.remove();    
    this.unbind();
  };

  // a publish/subscribe pattern for view decoupling
  App.PubSub = _.extend({}, Parse.Events);

  App.Routers.AppRouter = require('routers/AppRouter');

  // views are loaded up like so
  App.Views.LoginView = require('views/LoginView');
  App.Views.NavView = require('views/NavView');
  App.Views.SplashView = require('views/SplashView');
  App.Views.ProfileView = require('views/ProfileView');
  App.Views.CreateView = require('views/CreateView');
  App.Views.MainLayoutView = require('views/MainLayoutView');
  App.Views.FooterView = require('views/FooterView');
  App.Views.AboutView = require('views/AboutView');
  App.Views.CarouselDocumentView = require('views/CarouselDocumentView');
  App.Views.LargeDocumentView = require('views/LargeDocumentView');
  App.Views.SearchView = require('views/SearchView');
  App.Views.ShowView = require('views/ShowView');


  // models
  App.Models.Document = require('models/Document');
  App.Collections.DocumentList = require('collections/DocumentList');


  // render the main layout
  App.layout = new App.Views.MainLayoutView().render();

  // start up the frontend backbone router
  App.router = new App.Routers.AppRouter({
    layout: App.layout
  });


  App.hist = Parse.history.start({
    pushState: true
  });



  // initialize the book of the face
  // ignore the duplicate FB.init warnings
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ //fb parse integration
      appId: 'INSERT_FACEBOOK_APP_ID',
      cookie: true, // enable cookies to allow Parse to access the session
      xfbml: true
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));



});
