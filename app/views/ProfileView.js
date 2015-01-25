///user profile view



module.exports = Parse.View.extend({
  defaults: {
    photoUrl: "/images/profile_icon.png"
  },
  events: {
    "click .overlay": "changePhoto",
    "click .name-overlay": "changeDisplayname",
    "click .new-image-btn": "newPhoto",
    "click .select-image-btn": "selectChangePhoto",
    "click .cancel-image-btn": "cancelChangePhoto",
    "click #displayname-select": "selectDisplayname",
    "click #displayname-cancel": "cancelDisplayname"
  },
  user: null,
  photoEditMode: false,
  displaynameEditMode: false,

  el: "#main_content_area",
  template: require("templates/profile"),

  initialize: function(userid) {
    var self = this;

    App.PubSub.on('change:login', self.checkOnChange, this);

    //use current logged in user if there's no userid
    if (!userid && Parse.User.current()) {
      // need to update fields in case something was changed by cloud code
      // in particular when signing up the first time the profile picture is updated serverside
      Parse.User.current().fetch().then(function(userAgain) {
        self.user = userAgain;
        self.render();
      }, function(error) {
        console.log('couldnt do it: ' + error.message);
        App.router.navigate('/', {
          trigger: true
        });
      });
    } else {
      var query = new Parse.Query(Parse.User);
      query.get(userid, {
        success: function(user) {
          self.user = user;
          self.render();
        },
        error: function(error) {
          console.log('couldnt do it: ' + error.message);
          App.router.navigate('/', {
            trigger: true
          });
        }
      });
    }
    return this;
  },

  checkOnChange: function(change) {
    if (change['user'] == null) { //TODO: make sure this works
      console.log("just logged out, lets navigate away from profile");
      App.router.navigate('/', {
        trigger: true
      });
    }
  },

  newPhoto: function() {
    $('.cropit-image-input').click();
  },

  changePhoto: function(e) {
    if (this.canEdit()) {
      this.photoEditMode = true;
      this.render();
    }
  },

  changeDisplayname: function(e) {
    if (this.canEdit()) {
      this.displaynameEditMode = true;
      this.render();
    }
  },

  selectChangePhoto: function(e) {
    if (this.canEdit()) {
      var self = this;
      var file;
      try {
        file = $('#image-cropper').cropit('export', {
          type: 'image/jpeg',
          quality: 0.9,
        });
      } catch (e) {
        console.log("couldn't export: " + e);
      }
      var parseFile = new Parse.File("profile.jpg", {
        base64: file
      });
      parseFile.save().then(function(fileAgain) {
        self.user.set('picture', fileAgain);
        self.user.save().then(function(userAgain) {
          self.user = userAgain;
          self.photoEditMode = false;
          self.render();
        });
      }, function(error) {
        alert("couldn't save file: " + error.message);
      });
    }
  },

  cancelChangePhoto: function(e) {
    this.photoEditMode = false;
    this.render();
  },

  cancelDisplayname: function(e) {
    this.displaynameEditMode = false;
    this.render();
  },

  selectDisplayname: function() {
    if (this.canEdit()) {
      var self = this;
      var displayname = $('#newdisplayname').val();
      console.log(displayname);
      console.log(self.user);
      self.user.set('displayname', displayname);
      self.user.save().then(function(userAgain) {
        self.user = userAgain;
        self.displaynameEditMode = false;
        App.PubSub.trigger("change:login", {
          'user': userAgain
        });
        self.render();
      }, function(error) {
        alert("couldn't change your display name: " + error.message);
        self.displaynameEditMode = false;
        self.render();
      });
    }
  },


  render: function() {
    var self = this;
    if (self.user !== null) {
      var displayname = (self.user) ? self.user.escape("displayname") : "";
      var photoUrl = (self.user && self.user.has("picture")) ? self.user.get("picture").url() : self.defaults.photoUrl;
      this.$el.html(self.template({
        displayname: displayname,
        photoUrl: photoUrl,
        photoEditMode: self.photoEditMode,
        displaynameEditMode: self.displaynameEditMode,
        canEdit: self.canEdit()

      }));

      this.delegateEvents();

      //enable cropit
      $('#image-cropper').cropit({
        allowCrossOrigin: true,
        imageBackground: false,
        imageState: {
          src: photoUrl
        }
      });

    }
  },


  canEdit: function() {
    return (this.user == Parse.User.current());
  }


});
