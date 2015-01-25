// login nav buttons/profile view
// and search bar

module.exports = Parse.View.extend({
  events: {
    "click #logout-link": "logOut",
    "click #profile-link": "getProfile",
    "click #login_button": "showLogin",
    "click .create_button": "showCreate",
    "click #search_button": "runSearch",
    "keyup #search_input": "onKeyup"
  },

  el: "#navview",
  template: require("templates/nav"),

  initialize: function() {
    var self = this;
    _.bindAll(this, "logOut", "getProfile", "showLogin", "updateButtons", "showCreate", "runSearch", "onKeyup");

    App.PubSub.on('change:login', self.updateButtons, this); //update login nav if any change in login status
    App.PubSub.on('show:create', self.showCreate, this); //called from login if login was required

    return this;
  },


  onKeyup: function(e) {
    if (e) e.preventDefault(); //prevent the default browser submit action

    if (e.keyCode == 13) {
      this.runSearch(e);
    }
  },

  runSearch: function(e) {
    if (e) e.preventDefault(); //prevent the default browser submit action

    var val = $("#search_input").val();
    console.log("search val: " + val);

    // get an array of words out the search input minus stop words
    var toLowerCase = function(w) {
      return w.toLowerCase();
    };
    var words = val.split(/\b/);
    words = _.map(words, toLowerCase);
    var stopWords = ["the", "in", "and"]
    words = _.filter(words, function(w) {
      return w.match(/^\w+$/) && !_.contains(stopWords, w);
    });

    // query for all matching words
    var query = new Parse.Query(App.Models.Document);
    query.containsAll("words", words);
    query.limit(50);
    query.find({
      success: function(results) {
        console.log('search results: ' + results);
        if (results.length > 0) {
          // create an array of document models
          var collection = results.map(function(object) {
            return new App.Models.Document(object);
          });
          // navigate to search results page
          App.router.navigate('/search', {
            trigger: true
          });
          // notify results page of search
          App.PubSub.trigger("search:results", {
            'collection': collection
          });
        } else {
          console.log('no search results')

          /// http://nakupanda.github.io/bootstrap3-dialog/
          BootstrapDialog.show({
            message: 'No results found',
            onshown: function(dialogRef) {
              var dialog = dialogRef;
              setTimeout(function(d) {
                d.close()
              }, 1000, dialog);
            }
          });
        }
      },
      error: function(error) {
        console.log('search error: ' + error.message);
        BootstrapDialog.show({
          title: 'Error',
          message: 'search failed.'
        });
      }
    });
  },


  getProfile: function(e) {
    App.router.navigate('/profile', {
      trigger: true
    });
  },

  showLogin: function(e) {
    if (e) e.stopPropagation(); //prevent the default bootstrap modal action
    new App.Views.LoginView().render();
  },

  showCreate: function(e) {
    if (e) e.stopPropagation(); //prevent the default bootstrap modal action
    if (Parse.User.current()) {
      var createView = new App.Views.CreateView();
      createView.render();
      createView.showModal();
    } else {
      new App.Views.LoginView({
        message: "Please Login / Register first",
        callback: "show:create"
      }).render();
    }
  },

  logOut: function(e) {
    var self = this;
    Parse.User.logOut();
    App.PubSub.trigger("change:login", {
      'user': null
    });
  },


  render: function() {
    var self = this;
    this.$el.html(self.template());

    this.delegateEvents();

  },

  updateButtons: function(e) {
    if (Parse.User.current()) {
      $("#login_button").hide();
      $("#user_button").show();
      $("#nav_username").text(Parse.User.current().escape("displayname"));
    } else {
      $("#user_button").hide();
      $("#login_button").show();
    }
  }

});
