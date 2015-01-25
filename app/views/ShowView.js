///main_content_area



module.exports = Parse.View.extend({
  events: {
    "click #twitter_button": "twitter_button",
    "click #facebook_button": "facebook_button",
    "click #star_button": "star_button",
    "click #heart_button": "heart_button",
    "click #form_button": "form_button",
    "click #report_button": "report_button",
  },
  defaults: {
    photoUrl: "/images/profile_icon.png"
  },

  el: "#main_content_area",
  template: require("templates/show"),
  model: null,
  photoUrl: null,
  did: null,



  initialize: function(id) {
    var self = this;

    if (!id) {
      console.log("showing nothing?")
      App.router.navigate('/', {
        trigger: true
      });
      self.remove();
    } else {
      self.did = id;
      if (window.display_document) {
        self.model = new App.Models.Document(window.display_document);
        if (window.display_author.has("picture")) {
          self.photoUrl = window.display_author.get("picture").url();
        }
      }
    }

    return this;
  },



  render: function() {
    var self = this;

    if (!self.model && !self.photoUrl) {
      // var query = new Parse.Query(App.Models.Document);
      // query.get(self.did).then(function(object) {
      //   console.log('The object was retrieved successfully.');
      //   self.model = new App.Models.Document(object);
      //   return self.model;
      // }).then(function(model) {
      //   console.log('now to find author: ' + model.author.id);
      //   var query = new Parse.Query(Parse.User);
      //   return query.get(model.author.id);
      // }).then(function(author) {
      //   console.log('setting author info ' + author);
      //   self.photoUrl = (author && author.has("picture")) ? author.get("picture").url() : self.defaults.photoUrl;
      //   self.$el.html(self.template({
      //     modal: false,
      //     photoUrl: self.photoUrl,
      //     authorname: self.model.authorname,
      //     form: self.model.form_number
      //   }));
      //   self.LargeDocumentView = new App.Views.LargeDocumentView({
      //     model: self.model,
      //   });
      //   self.LargeDocumentView.render();
      //   self.delegateEvents();
      // }, function(error) {
      //   console.log('The object was not retrieved successfully.' + error.message);
      //   App.router.navigate('/', {
      //     trigger: true
      //   });
      // });
    } else {
      self.$el.html(self.template({
        modal: false,
        photoUrl: self.photoUrl,
        authorname: self.model.authorname,
        form: self.model.form_number
      }));
      self.LargeDocumentView = new App.Views.LargeDocumentView({
        model: self.model,
        showtags: true
      });
      self.LargeDocumentView.render();
      self.delegateEvents();

    }
  },

  twitter_button: function(e) {
    BootstrapDialog.show({
      title: 'Alert',
      message: 'not yet implemented'
    });
  },
  facebook_button: function(e) {
    var self = this;
    FB.ui({
      method: 'share',
      href: 'http://siteurl.dali.dartmouth.edu/show/' + self.model.id,
    }, function(response) {});
  },
  star_button: function(e) {

  },
  heart_button: function(e) {

  },
  form_button: function(e) {

  },
  report_button: function(e) {

  },



});
