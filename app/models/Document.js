/*----------------*\
Basic Document Model
\*----------------*/


module.exports = Parse.Object.extend('Document', {
  text: '',
  hashtags: [],
  words: [],
  author: null,
  authorname: "",

  // init and load state data if necessary
  // not really necessary could just use .get/.set style
  initialize: function(params) {
    if (params) {
      this.load(params);
    }
  },


  // saves the necessary state data
  commit: function(success, error) {
    var self = this;
    var success = success;
    var error = error;
    var user = Parse.User.current();

    // set acl so only same user can edit
    var acl = new Parse.ACL(user);
    acl.setPublicReadAccess(true);
    this.setACL(acl);

    this.save({
      'text': self.text,
      // note hashtags and words are not saved explicitly
      // they are generated in cloud code BeforeSafe function
      'author': user, //just the current logged in user at time of creation
      'authorname': user.get('displayname')
    }, {
      success: success,
      error: error
    });
  },

  // load in parse params
  load: function(params) {
    if (params) {
      this.text = params.get("text");
      this.words = params.get("words");
      this.hashtags = params.get("hashtags");
      this.author = params.get("author");
      this.authorname = params.get("authorname");
    }
  },



});
