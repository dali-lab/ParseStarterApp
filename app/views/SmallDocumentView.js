//small static document view

module.exports = Parse.View.extend({
  events: {

  },

  el: "#small_document",
  model: null,

  template: require("templates/smallDocument"),

  initialize: function(model) {

    this.refresh(model);
    return this;
  },

  refresh: function(model) {
    this.model = model;
  },


  render: function() {
    var self = this;
    this.$el.empty();

    this.$el.html(self.template({
      "text": self.model.text
    }));


    this.delegateEvents();

  },



});
