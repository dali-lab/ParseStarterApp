// EXPRESS BACKEND:
// this starts up the nodejs express backend in the cloud
require('cloud/app.js');


//CLOUD CODE:
//pulls facebook image and saves locally in the database
var Image = require("parse-image");
Parse.Cloud.afterSave(Parse.User, function(request) {
  query = new Parse.Query(Parse.User);
  query.get(request.object.id, {
    success: function(user) {
      var facebookPictureUrl = user.get("facebookPictureUrl");
      var existingPhoto = user.get("picture")
      if (!existingPhoto && facebookPictureUrl) {
        Parse.Cloud.httpRequest({
          url: facebookPictureUrl
        }).then(function(response) {
          //get the response image data
          var image = new Image();
          return image.setData(response.buffer);
        }).then(function(image) {
          // Make sure it's a JPEG
          return image.setFormat("JPEG");
        }).then(function(image) {
          // Get the image data in a Buffer.
          return image.data();
        }).then(function(buffer) {
          // Save the image into a new file.
          var base64 = buffer.toString("base64");
          var picfile = new Parse.File("profile.jpg", {
            base64: base64
          });
          return picfile.save();
        }).then(function(picfile) {
          //save the user with the pic
          user.set("picture", picfile);
          user.save();
        }).then(function(result) {
          console.log('successful save of new profile image for user: ' + user.displayname);
        }, function(error) {
          console.error('ran into an error: ' + error.message);
        });

      }
    },
    error: function(error) {
      console.error('query for user failed with response code ' + error.status);
    }
  });
});


// creates an indexed array of words and hashtags for searchability later on
// this allows an almost full text search
var _ = require("underscore");
Parse.Cloud.beforeSave("Document", function(request, response) {
  var doc = request.object;

  var toLowerCase = function(w) {
    return w.toLowerCase();
  };
  var words = doc.get("text").split(/\b/);
  words = _.map(words, toLowerCase);
  var stopWords = ["the", "in", "and"]
  words = _.filter(words, function(w) {
    return w.match(/^\w+$/) && !_.contains(stopWords, w);
  });

  var hashtags = doc.get("text").match(/#.+?\b/g);
  hashtags = _.map(hashtags, toLowerCase);

  doc.set("words", words);
  doc.set("hashtags", hashtags);
  response.success();
});
