(function (){

  // placeholder for employee list item view
  window.EmployeeListItemView = Backbone.View.extend({
      tagName : "li",
  		className : "listItem",
      initialize: function () {
  			_.bindAll(this, 'render');
        this.template = _.template($('#EmployeeListItemViewTemplate').html());
      },
      render: function () {
        var renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      }
    });

}).call(this);
