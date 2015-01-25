///about stuff view



module.exports = Parse.View.extend({
  events: {
    //"click #logout-link": "logOut",
  },

  el: "#main_content_area",
  template: require("templates/about"),

  initialize: function() {
    return this;
  },


  render: function() {
    var self = this;
    this.$el.html(self.template());

    this.delegateEvents();

  }

});
