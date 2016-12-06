(function (){

var footer = document.querySelector('.footer');
if (window.location.hash){

  var hash = window.location.hash.substr(1)
  var googleSheets = '<google-sheets key="' + hash  + '" tab-id="1" client-id="41248146944-jpcqhs9lp3t69pgvlercu8roijmoqbfm.apps.googleusercontent.com"></google-sheets>';
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
} else {
  footer.innerHTML = 'got nothing';
}

})();
