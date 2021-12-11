//Authors: Sydney Ross and Justin Light

var Route = {};
Route.path = function(route, callBack) { Route[route] = callBack; }


  function doGet(e)
  {
    //Home
    Route.path("login", loadLogin)

    Route.path("profile", loadProfile)

    
    Logger.log( Utilities.jsonStringify(e) );
    if(Route [e.parameters.v])
    {
      return Route [e.parameters.v]();
    } 
    else 
    {
      return HtmlService.createTemplateFromFile("Login").evaluate();
    }
  }

  //INCLUDE JAVASCRIPT AND CSS FILES
  //REF: https://developers.google.com/apps-script/guides/html/best-practices#separate_html_css_and_javascript
  function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename)
        .getContent();
  }

  function getScriptUrl() {
    var url = ScriptApp.getService().getUrl();
    return url;
  }

  function checkLogin(username, password) {
    var url1 = 'https://docs.google.com/spreadsheets/d/113wxEF0wJh82eMOt6aqIcby_qiUKoqn_0xPspkxycec/edit#gid=0';
    //Paste URL of GOOGLE SHEET
    var ss= SpreadsheetApp.openByUrl(url1);
    var webAppSheet = ss.getSheetByName("Sheet1");
    var getLastRow =  webAppSheet.getLastRow();
    var found_record = '';
    for(var i = 1; i <= getLastRow; i++)
    {
      if(webAppSheet.getRange(i, 3).getValue() === username && 
        webAppSheet.getRange(i, 4).getValue() === password)
      {
        found_record = 'TRUE';
      }    
    }
      if(found_record == '')
      {
        found_record = 'FALSE'; 
      }
  
    return found_record;
  }

  //Get Profile Data
function getInfoData(username)
{
  var first_name = 'na';
  var last_name = 'na';
  var phone = 'na';
  
  var url1 = 'https://docs.google.com/spreadsheets/d/113wxEF0wJh82eMOt6aqIcby_qiUKoqn_0xPspkxycec/edit#gid=0';
  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url1);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var getLastRow =  webAppSheet.getLastRow();
  for(var i = 1; i <= getLastRow; i++){
    var userFromSheets = webAppSheet.getRange(i, 3).getDisplayValue();
    userFromSheets = '"'+ userFromSheets + '"';
    if(userFromSheets == username){
      first_name = webAppSheet.getRange(i, 1).getDisplayValue();
      last_name = webAppSheet.getRange(i, 2).getDisplayValue();
      phone = webAppSheet.getRange(i, 5).getDisplayValue();
    }
  }
  return [first_name, last_name, phone];
}

