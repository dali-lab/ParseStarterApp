//larger document view

module.exports = Parse.View.extend({
  events: {

  },

  el: "#large_document",
  model: null,

  template: require("templates/largeDocument"),

  initialize: function(params) {
    if (params.el) this.el = params.el; //optional element

    this.refresh(params.model);

    return this;

  },

  refresh: function(model) {
    this.model = model;
  },



  render: function() {
    var self = this;
    this.$el.empty();

    this.$el.html(self.template({
      text: self.model.text
    }));
  },



});
