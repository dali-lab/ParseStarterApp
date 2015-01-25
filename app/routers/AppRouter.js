/*----------------*\
// these are the frontend backbone routes
// see cloud/app.js  for express backend routes
\*----------------*/

module.exports = Parse.Router.extend({
  routes: {
    "": "home",
    "/": "home",
    "about": "about",
    "profile/:userid": "profile",
    "profile": "profile",
    "show/:did": "show",
    "search": "search"
  },

  initialize: function(options) {
    this.layout = options.layout;
  },

  home: function() {
    this.layout.renderChild(new App.Views.SplashView());
  },

  profile: function(userid) {
    if (userid || Parse.User.current()) { //show self profile if userid not given
      this.layout.renderChild(new App.Views.ProfileView(userid));
    }
  },
  about: function() {
    this.layout.renderChild(new App.Views.AboutView());
  },
  search: function() {
    this.layout.renderChild(new App.Views.SearchView());
  },
  show: function(did) {
    this.layout.renderChild(new App.Views.ShowView(did));
  }




});
