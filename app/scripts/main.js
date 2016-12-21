(function (){
var footer = document.querySelector('.footer');


var Workspace = Backbone.Router.extend({

  // some constants
  CLIENT_ID : '41248146944-jpcqhs9lp3t69pgvlercu8roijmoqbfm.apps.googleusercontent.com',
  SCOPES : ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  sheetID : '',

  routes: {
    "":                    "home",       // #home
    "s/:query":            "viewSheet",  // #search/[google-sheets id]
    "s/:query/":            "viewSheet",  // #search/[google-sheets id]
    "s/:query/e/:employee": "viewEmployee"   // #search/[google-sheets id]/p7
  },

  initialize: function () {
    this.headerView = new HeaderView();
    this.mainView = new MainView();
    $('#header').html(this.headerView.render().el);
    $('#main').html(this.mainView.render().el);

     var api = document.querySelector('#sheets');
     var auth = document.querySelector('#g-signin');


     // TODO: handle logout events
     if( api.libraryLoaded && auth.signedIn ) {
       Backbone.history.start();
     } else {
       api.addEventListener('google-api-load', function(e){
         Backbone.history.start();
       });
       api.addEventListener('google-api-load-error', function(e){
         console.log('failed to load api', e);
       });
      //  auth.addEventListener('google-signin-success', function(e) {
      //    console.log('successfully signed in', e, gapi);
      //    if(!api.libraryLoaded){
      //      gapi.load('sheets', '4', {callback: Backbone.history.start});
      //    }
      //  });
     }

     function  loadedSheets(){
       console.log('sheets loaded thinging');
     }

  },
  checkAuth : function () {
    // consider polling to check gapi load status
  }

  home: function() {
    console.log('home');
  },
  viewSheet: function(query, employee) {
    this.sheetID = query;
    if(this.sheetID.length > 0){
      console.log('sheet id longer');
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetID,
        majorDimension: 'ROWS',
        range: 'A2:I99',
      }).then(function(response) {
        var range = response.result;
        // console.log('range', range.values);
        if (range.values.length > 0) {
          if(!window.allEmployees) {
            window.allEmployees =  new window.AllEmployees(range.values);
          }
          window.employeeListView = new window.EmployeeListView({
            collection : window.allEmployees
          });
          window.employeeListView.render();
        } else {
          console.log('No data found.');
        }
      }, function(response) {
        console.log('Error: ' + response.result.error.message);
      });
    } // end if(this.sheetID.length > 0)
  },
  viewEmployee: function (query, employee){
    this.sheetID = query;
    if(!window.employees){
      if(this.sheetID.length > 0){
        console.log('sheet id longer');
        gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: this.sheetID,
          majorDimension: 'ROWS',
          range: 'A2:I99',
        }).then(function(response) {
          var range = response.result;
          // console.log('range', range.values);
          if (range.values.length > 0) {

            window.allEmployees =  new window.AllEmployees(range.values);
            var requestedEmployee = window.allEmployees.get(employee);
            window.employeeDetailView = new window.EmployeeDetailView({
              model : requestedEmployee
            });
            //TODO: use a main view controller for this
            window.employeeDetailView.render();
          } else {
            console.log('No data found.');
          }
        }, function(response) {
          console.log('Error: ' + response.result.error.message);
        });
      }
    } else { // end if(!window.employees)
      var requestedEmployee = window.allEmployees.get(employee);
      window.employeeDetailView = new window.EmployeeDetailView({
        model : requestedEmployee
      });
      //TODO: use a main view controller for this
      // $('#main').append(window.employeeDetailView.render().el);
    }
  }

});


$( document ).ready(function() {
  window.app = new Workspace();
});

})();
