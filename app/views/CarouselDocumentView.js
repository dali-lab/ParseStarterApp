//small static document view

module.exports = Parse.View.extend({
  events: {

  },

  model: null,
  index: 0,
  parent: null,

  template: require("templates/carouselDocument"),

  initialize: function(params) {

    this.model = params.model;
    this.index = params.index;
    this.parent = params.parent;

    return this;
  },


  render: function() {
    var self = this;
    var html = self.template({
      text: self.model.text,
      index: self.index
    });
    $(this.parent).append(html);
  },



});
