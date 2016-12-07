(function (){
var footer = document.querySelector('.footer');


var Workspace = Backbone.Router.extend({

  routes: {
    "":                    "home",       // #home
    "s/:query":            "viewSheet",  // #search/[google-sheets id]
    "s/:query/e:employee": "viewSheet"   // #search/[google-sheets id]/p7
  },

  initialize: function () {
    // hmmm
  },

  home: function() {
    console.log('home');
  },

  viewSheet: function(query, employee) {
    window.allEmployees =  new window.AllEmployees();
    this.employeeListView = new window.EmployeeListView({
      collection : window.allEmployees
    });
    var googleSheets = '<google-sheets key="' + query  + '" tab-id="1" client-id="41248146944-jpcqhs9lp3t69pgvlercu8roijmoqbfm.apps.googleusercontent.com"></google-sheets>';

    footer.innerHTML = googleSheets;

    var sheet = document.querySelector('google-sheets');

    sheet.addEventListener('google-sheet-data', function(e) {

      this.rows.forEach(function(row){

        // backbone thinks that the row ids are identical, so won't add new rows.
        // forcing the issue by creating new unique ids
        // bit of a hack
        // todo: make it not a hack
        row.id = Math.floor(Math.random() * (99999 - 1));

        var newEmployee = new Employee(row);
        window.allEmployees.add(newEmployee);

      });

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
