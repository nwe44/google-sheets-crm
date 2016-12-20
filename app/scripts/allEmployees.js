(function (){
  // placeholder for employee collection
  window.AllEmployees = Backbone.Collection.extend({
    model: function(attrs){
      // console.log('setting employee', arguments, this);
      return new window.Employee(attrs, {parse : true});
    }
  });
}).call(this);
