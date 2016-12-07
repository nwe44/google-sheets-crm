(function (){
var footer = document.querySelector('.footer');


var Workspace = Backbone.Router.extend({

  routes: {
    "":                    "home",       // #home
    "s/:query":            "viewSheet",  // #search/[google-sheets id]
    "s/:query/e/:employee": "viewSheet"   // #search/[google-sheets id]/p7
  },

  initialize: function () {
    // hmmm
  },

  home: function() {
    console.log('home');
  },

  viewSheet: function(query, employee) {
    console.log('view sheet');
    window.sheetID = query;
    window.allEmployees =  new window.AllEmployees();
    window.employeeListView = new window.EmployeeListView({
      collection : window.allEmployees
    });
    var googleSheets = '<google-sheets key="' + query  + '" tab-id="1" client-id="41248146944-jpcqhs9lp3t69pgvlercu8roijmoqbfm.apps.googleusercontent.com"></google-sheets>';

    footer.innerHTML = googleSheets;

    var sheet = document.querySelector('google-sheets');

    sheet.addEventListener('google-sheet-data', function(e) {
      var rownum = 0;
      this.rows.forEach(function(row){

        // backbone thinks that the row ids are identical, so won't add new rows.
        // forcing the issue
        // todo: make this cannonical
        row.id = rownum;

        var newEmployee = new Employee(row);
        window.allEmployees.add(newEmployee);
        rownum++;
      });
      if(!employee){
          console.log('list view');
          window.employeeListView.render();
      } else {
        console.log('detail view');
        var requestedEmployee = window.allEmployees.get(employee);
        window.employeeDetailView = new window.EmployeeDetailView({
          model : requestedEmployee
        });
        //TODO: use a main view controller for this
        $('#main').append(window.employeeDetailView.render().el);
      }


    });

    sheet.addEventListener('error', function(e) {
     // e.detail.response
    });
  }

});
$(document).ready(function () {
  window.App = new Workspace();
  Backbone.history.start();
});
// -- //
})();
