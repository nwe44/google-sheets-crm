(function (){
  // placeholder for employee model
  window.Employee = Backbone.Model.extend({
    parse : function(response){
      // console.log('parse argumnets', arguments, this);
      var parsedResponse = {
          sheetID : window.app.sheetID
      };
      var dataNames = [
        'id',
        'firstName',
        'lastName',
        'title',
        'email',
        'reports',
        'currentProject',
        'pastProject',
        'notes',
        'methodContact',
        'escalationContact'
      ]
      for (var i = 0, length = dataNames.length; i < length; ++i){
        var attribute = response[i];
        if(typeof attribute !== 'undefined' && attribute !== null){
          parsedResponse[dataNames[i]] = attribute;
        } else {
          parsedResponse[dataNames[i]] = " "; // to simplify templates
        }
      }
      return parsedResponse;
    }

  });
}).call(this);
