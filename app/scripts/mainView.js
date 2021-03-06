(function (){

  // placeholder for main view
  window.MainView = Backbone.View.extend({
      className : "viewWrapper",
      initialize: function () {
  			_.bindAll(this, 'render');
        this.template = _.template($('#MainViewTemplate').html());
      },
      render: function () {
        $(this.el).html(this.template());
        return this;
      }
    });

}).call(this);
