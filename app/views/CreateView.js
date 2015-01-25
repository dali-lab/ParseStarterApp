//login view

module.exports = Parse.View.extend({
  events: {
    "click .previous": "changeForm",
    "click .next": "changeForm",
    "click #continue_button": "continue",
    "keyup .create_lines": "onKeyup"
  },

  el: "body", //attach modal directly to body so it will pop up on top of all over views
  model: null,
  enclosing: '#create_modal',

  template: require("templates/create"),


  initialize: function() {
    var self = this;

    _.bindAll(this, 'showModal', 'changeForm', 'continue', 'onKeyup');

    this.model = new App.Models.Document();

    return this;

  },

  onKeyup: function(e) {
    if (e) e.preventDefault(); //prevent the default browser submit action

    if (e.keyCode == 13) {
      this.changeForm(e);
    }
  },

  changeForm: function(e) {
    var self = this;
    var tid = e.target.id;
    if (tid) {
      var create = $(".create-form");
      var done = $(".done-form");

      $(create).hide();
      $(done).hide();

      // attempt to save
      if (tid == "submit_button" || tid == "text_input") {
        var text = $("#text_input").val();
        self.model.text = text;
        self.model.commit(function(success) {
          $(done).show();
        }, function(error) {
          console.log("model error:" + error.message);
          //TODO: handle error
        });
      } else {
        $(create).show();
      }
    }
  },


  showModal: function() {
    $('#create_modal').modal('show');
  },

  continue: function() {
    this.undelegateEvents();
    $('#create_modal').modal('hide');
  },

  render: function() {
    var self = this;
    $("#createview").remove();

    this.$el.prepend(self.template({}));

    this.delegateEvents();

  },



});
