(function (){

  // placeholder for employee list item view
  window.EmployeeListItemView = Backbone.View.extend({
  		className : "listItem",
      initialize: function () {
  			_.bindAll(this, 'render');
      },
      render: function () {}
    });

}).call(this);
