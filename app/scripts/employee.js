(function (){
  // placeholder for employee model
  window.Employee = Backbone.Model.extend({
    get employeeID(){
      if(!this.id) return;
      return this.id.$t
    },
    idAttribute : 'employeeID',
    initialize: function () {

    }
  });
}).call(this);
