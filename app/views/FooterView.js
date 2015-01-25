module.exports = Parse.View.extend({
  events: {
    // "click #logout-link": "logOut",
  },

  el: "#footer",
  template: require("templates/footer"),

  initialize: function() {
    var root = this;

    return this;
  },


  render: function() {
    var self = this;
    this.$el.html(self.template());

    this.delegateEvents();
  }

});
