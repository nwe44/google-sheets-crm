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
    this.sheetID = query;
    this.checkAuth();

    $('#authorize-button').click(this.handleAuthClick());

    window.allEmployees =  new window.AllEmployees();
    window.employeeListView = new window.EmployeeListView({
      collection : window.allEmployees
    });
  },

  // utilities -------------
  /**
    * Check if current user has authorized this application.
    */
  checkAuth: function() {
    console.log(gapi, 'hello world');
     gapi.auth2.authorize(
       {
         'client_id': this.CLIENT_ID,
         'scope': this.SCOPES.join(' '),
         'immediate': true
       }, handleAuthResult);
   },
  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  handleAuthResult: function (authResult) {
    console.log('handle', authResult);
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      loadSheetsApi();
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  },
  /**
   * Load Sheets API client library.
   */
  loadSheetsApi: function() {
    var discoveryUrl =
        'https://sheets.googleapis.com/$discovery/rest?version=v4';
    gapi.client.load(discoveryUrl).then(buildPage);
  },

  ///
  buildPage: function(){
    if(this.sheetID > 0){
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: this.sheetID,
        // range: 'Class Data!A2:E',
      }).then(function(response) {
        console.log (response);
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
  },
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
  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  handleAuthClick: function(event) {
    console.log('hangling auth click');
    gapi.auth2.authorize(
      {client_id: this.CLIENT_ID, scope: this.SCOPES, immediate: false},
      handleAuthResult);
    return false;
  },
  authorized: function(){
    console.log('rocking');
  }


});
$(document).ready(function () {

  window.App = new Workspace();
  var api = document.querySelector('google-js-api');
  api.addEventListener('js-api-load', function(e) {
    Backbone.history.start();
  });
});


// -- //
})();
