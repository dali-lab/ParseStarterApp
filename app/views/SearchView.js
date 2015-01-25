///search view


module.exports = Parse.View.extend({
  collection: [],

  el: "#main_content_area",
  template: require("templates/search"),

  initialize: function() {
    var self = this;
    App.PubSub.on('search:results', self.populate, this);
    return this;
  },


  render: function() {
    var self = this;

    this.$el.html(self.template({collection: self.collection}));

  },

  populate: function(props) {
    this.collection = props.collection;
    this.render();
  }

});
