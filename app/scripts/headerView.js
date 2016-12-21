(function (){

  // placeholder for main view
  window.HeaderView = Backbone.View.extend({
  		// className : "headerView",
      tagName : "div",
      initialize: function () {
  			_.bindAll(this, 'render');
        this.template = _.template($('#HeaderViewTemplate').html());
      },
      render: function () {
        $(this.el).html(this.template());
        return this;
      }
    });

}).call(this);
