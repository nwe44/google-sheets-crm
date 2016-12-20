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
    "s/:query/e/:employee": "viewSheet"   // #search/[google-sheets id]/p7
  },

  initialize: function () {
    // hmmm
  },

  home: function() {
    console.log('home');
  },
  viewSheet: function(query, employee) {
    console.log('viewsheet', query);
    this.sheetID = query;
    if(this.sheetID.length > 0){
      console.log('sheet id longer');
      gapi.client.sheets.spreadsheets.get({
        spreadsheetId: this.sheetID,
        majorDimension: 'ROWS'
         range: 'A1:D99',
      }).then(function(response) {
        console.log ('response',response, response.result);
        // var range = response.result;
        // if (range.values.length > 0) {
        //   appendPre('Name, Major:');
        //   for (i = 0; i < range.values.length; i++) {
        //     var row = range.values[i];
        //     // Print columns A and E, which correspond to indices 0 and 4.
        //     appendPre(row[0] + ', ' + row[4]);
        //   }
        // } else {
        //   appendPre('No data found.');
        // }
      }, function(response) {
        appendPre('Error: ' + response.result.error.message);
      });
    }
    window.allEmployees =  new window.AllEmployees();
    window.employeeListView = new window.EmployeeListView({
      collection : window.allEmployees
    });
  },

  ///


    // console.log('got new data from google', this.rows, e);
    // window.allEmployees.add(this.rows);
    // if(!employee){
    //     window.employeeListView.render();
    // } else {
    //   var requestedEmployee = window.allEmployees.get(employee);
    //   window.employeeDetailView = new window.EmployeeDetailView({
    //     model : requestedEmployee
    //   });
    //   //TODO: use a main view controller for this
    //   $('#main').append(window.employeeDetailView.render().el);
    // }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre: function(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  },



});
$(document).ready(function () {

  window.App = new Workspace();
  var api = document.querySelector('#sheets');
  var auth = document.querySelector('#g-signin');
  auth.addEventListener('google-signin-success', function(e) {
    console.log('successfully signed in', e);
  });
  api.addEventListener('google-api-load', function(e) {
    console.log('successfully loaded api', e);

    if(auth.signedIn){
      Backbone.history.start();
    }
  });
  if(api.libraryLoaded && auth.signedIn) {
    Backbone.history.start();
  }

  // todo: handle logout events

  console.log(api, api.libraryLoaded, auth.signedIn );
  api.addEventListener('google-api-load-error', function(e){
    console.log('failed to load api', e);
  });
});


// -- //
})();
