///main_content_area



module.exports = Parse.View.extend({
  events: {
    "click  #create_in_splash": "create",
    "click  #share_in_splash": "share",
    "click  #explore_in_splash": "explore",
    "click  #carousel-right": "right",
    "click  #carousel-left": "left"
  },

  el: "#main_content_area",
  template: require("templates/splash"),

  currentPage: 0,
  hitEnd: false,


  initialize: function() {
    _.bindAll(this, "right", "left");

    return this;
  },

  create: function() {

  },
  share: function() {

  },
  explore: function() {

  },




  render: function() {
    var self = this;

    self.hitEnd = false;

    this.$el.html(self.template());

    self.loadMore('right');

    this.delegateEvents();

  },

  loadMore: function(direction) {
    var self = this;
    if (direction === "right") {
      var newones = new App.Collections.DocumentList();
      var targetPage = self.currentPage + 1;
      newones.fetch({
        add: true,
        data: {
          page: targetPage
        },
        success: function(collection, response, option) {
          if (collection.length == 0) {
            if (!self.hitEnd) {
              console.log("No more documents to load");
            }
            self.hitEnd = true;
          } else {
            self.currentPage++;

            _.each(collection.models, function(model, i) {
              var m = new App.Models.Document(model);
              var carousel = new App.Views.CarouselDocumentView({
                index: i,
                model: m,
                parent: $("#carousel-of-documents .carousel-inner")
              });
              carousel.render();
            });


            $('#carousel-of-documents .carousel').carousel({
              interval: false
            });

            //workaround for forcing a pause so theres no autoplaying
            $(document).on('mouseleave', '.carousel', function() {
              $(this).carousel('pause');
            });



          }

        }
      });
    }
  },
  right: function() {
    this.loadMore('right');
  },
  left: function() {
    this.loadMore('left');
  }



});
