(function (){

  // placeholder for employee list view
  window.EmployeeDetailView = Backbone.View.extend({
  		className : "EmployeeDetailView",
      initialize: function () {
        _.bindAll(this, 'render');
        this.template = _.template($('#EmployeeDetailViewTemplate').html());
      },
      render: function () {
        var renderedContent = this.template(this.model.toJSON());
        $(this.el).html(renderedContent);
        return this;
      }
    });

}).call(this);
