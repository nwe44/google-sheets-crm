(function (){
  // placeholder for employee collection
  window.AllEmployees = Backbone.Collection.extend({
    model: window.Employee
    // initialize: function (){
    //   this.on("add", function() { console.log("added to collection"); });
    // }
  });
}).call(this);
