///Main Layout View


module.exports = Parse.View.extend({

  el: "#layout",

  initialize: function() {

  },

  render: function() {
    this.header = new App.Views.NavView().render();
    this.footer = new App.Views.FooterView().render();
    return this;
  },

  renderChild: function(view) {
    if (this.child)
      this.child.close();
    this.child = view.render();
  }

});
