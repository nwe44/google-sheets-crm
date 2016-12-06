(function (){
var footer = document.querySelector('.footer');


var Workspace = Backbone.Router.extend({

  routes: {
    "":                    "home",       // #home
    "s/:query":            "viewSheet",  // #search/[google-sheets id]
    "s/:query/e:employee": "viewSheet"   // #search/[google-sheets id]/p7
  },

  home: function() {
    console.log('home');
  },

  viewSheet: function(query, employee) {
    console.log(query);
    var googleSheets = '<google-sheets key="' + query  + '" tab-id="1" client-id="41248146944-jpcqhs9lp3t69pgvlercu8roijmoqbfm.apps.googleusercontent.com"></google-sheets>';
    footer.innerHTML = googleSheets;
    var sheet = document.querySelector('google-sheets');
    sheet.addEventListener('google-sheet-data', function(e) {

     console.log(this.rows); //- list of the user's spreadsheets
     // this.tab - information on the tab that was fetched
     // this.rows - cell row information for the tab that was fetched
    });

    sheet.addEventListener('error', function(e) {
     // e.detail.response
    });
  }

});

window.App = new Workspace();
Backbone.history.start();

// -- //
})();
