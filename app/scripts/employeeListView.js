(function (){

  // placeholder for employee list view
  window.EmployeeListView = Backbone.View.extend({
      tagName : "section",
  		className : "listView",
      initialize: function () {
        _.bindAll(this, 'render');
  			this.template = _.template($('#EmployeeListViewTemplate').html());
  			this.collection.bind('reset', this.render);
      },
      render: function () {

      			var $container = $('#list-view');
      			$container.empty();
      			$container.append(this.el);

      			var $employees, collection = this.collection;

      			this.$el.html(this.template({}));
      			$employees = this.$('.employees-list');

      			collection.each(function (employee) {

      				var view = new window.EmployeeListItemView({
      					model : employee,
      					collection : collection
      				});
      				$employees.append(view.render().el);
      			});
      			return this;
      		}
    });

}).call(this);
