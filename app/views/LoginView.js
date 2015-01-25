//login view

module.exports = Parse.View.extend({
  events: {
    "submit form.login-form": "logIn",
    "submit form.signup-form": "signUp",
    "submit form.fb-login-form": "fbLogIn",
  },

  el: "#login_modal_goes_here",

  template: require("templates/login"),
  callback: null,

  initialize: function(params) {
    var self = this;
    _.bindAll(this, "logIn", "signUp", "fbLogIn");

    if (params) {
      if (params.message) self.$(".login-form .error").html(params.message).show();
      if (params.callback) self.callback = (params.callback) ? params.callback : null;
    }

    return this;
  },

  logIn: function(e) {
    var self = this;
    var username = this.$("#login-email").val();
    var password = this.$("#login-password").val();

    console.log("logIn");

    Parse.User.logIn(username, password, {
      success: function(user) {
        App.PubSub.trigger("change:login", {
          'user': user
        });
        $('#login_modal').modal('hide');
        if (self.callback) {
          App.PubSub.trigger(self.callback);
        }
        self.undelegateEvents();
        delete self;
      },

      error: function(user, error) {
        self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
      }

    });

    return false;
  },


  fbLogIn: function(e) {
    console.log("fbLogIn");

    var self = this;
    Parse.FacebookUtils.logIn("email", {
      success: function(user) {
        if (!user.existed()) {
          console.log("User signed up and logged in through Facebook!");
          // fetch additional facebook info
          FB.api('/me', function(me) {
            user.set("displayname", me.name);
            user.set("email", me.email);
            user.save();
            console.log("/me response", me);

          });
          //fetch facebook profile picture and save it
          //  on save there is some cloud code that runs to save it
          FB.api('/me/picture?height=200&width=200&redirect=false&return_ssl_resources=0', function(me) {
            user.set("facebookPictureUrl", me.data.url);
            user.save();
            console.log("/me/picture response", me);
          });

        } else {
          console.log("User logged in through Facebook!");
        }
        $('#login_modal').modal('hide');
        //new App.Views.ManageTodosView();
        App.PubSub.trigger("change:login", {
          'user': user
        });
        if (self.callback) {
          App.PubSub.trigger(self.callback);
        }
        self.undelegateEvents();
        delete self;
      },
      error: function(user, error) {
        console.log("User cancelled the Facebook login or did not fully authorize.");
        self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
      }
    });

    return false;
  },

  signUp: function(e) {
    var self = this;
    var email = this.$("#signup-email").val();
    var displayname = this.$("#signup-displayname").val();
    var password = this.$("#signup-password").val();


    var user = new Parse.User();

    user.set("username", email);
    user.set("password", password);
    user.set("email", email);
    user.set("displayname", displayname);

    console.log("attempting signup");

    user.signUp(null, {
      success: function(user) {
        App.PubSub.trigger("change:login", {
          'user': user
        });
        if (self.callback) {
          App.PubSub.trigger(self.callback);
        }
        $('#login_modal').modal('hide');
        console.log("successfull signup!");
        self.undelegateEvents();
        delete self;
      },

      error: function(user, error) {
        console.log("error on signup!");
        self.$(".signup-form .error").html(error.message).show();
      }
    });

    return false;
  },

  showModal: function() {
    $('#login_modal').modal('show');
  },

  render: function() {
    var self = this;
    this.$el.html(self.template());

    this.showModal();


    this.delegateEvents();

  },


});
