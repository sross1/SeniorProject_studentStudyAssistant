var userFirstName = '';
var userLastName = '';

function doGet(e) {
  Logger.log( Utilities.jsonStringify(e) );
  if (!e.parameter.page) {
    // When no specific page requested, return "home page"
    return HtmlService.createTemplateFromFile('Home').evaluate();
  }
  // else, use page parameter to pick an html file from the script
  return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
}

function newPage(page) {
  return HtmlService.createHtmlOutputFromFile(page).getContent()
}

function getFirstName(){
  return userFirstName;
}

function getLastName(){
  return userLastName;
}

/**
 * Get the URL for the Google Apps Script running as a WebApp.
 */
function getScriptUrl() {
 var url = ScriptApp.getService().getUrl();
 return url;
}

function getData() {
  return SpreadsheetApp
      .openById('1bYJi7-HJ4eq4BUy4LWMqfT0ehwP44G1jZ3qzrQrDDsU')
      .getSheetByName("Cleaned Form Data")
      .getDataRange()
      .getValues();
}

//INCLUDE JAVASCRIPT AND CSS FILES
//REF: https://developers.google.com/apps-script/guides/html/best-practices#separate_html_css_and_javascript
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function AddRecord(firstname, lastname, email, password, occupation) {
  var url = 'https://docs.google.com/spreadsheets/d/1lRKzrHwzaaWLfW8quisChJgkEzN6AzgOdQDQbW0yV1U/edit#gid=0';
  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var rowNum = webAppSheet.getLastRow();
  var userStatus = 'TRUE'
  var record_added = '';
  webAppSheet.appendRow([firstname, lastname, email, password, occupation, new Date(), userStatus]);
  var newRowNum = webAppSheet.getLastRow();
  if (newRowNum > rowNum){
    record_added = 'TRUE';
  }
  else{
    record_added = 'FALSE';
  }
  
  return record_added;
}

function checkNewMember(username){
  var url1 = 'https://docs.google.com/spreadsheets/d/1lRKzrHwzaaWLfW8quisChJgkEzN6AzgOdQDQbW0yV1U/edit#gid=0';
  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url1);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var getLastRow =  webAppSheet.getLastRow();
  var userStatus = 'TRUE';
  for(var i = 1; i <= getLastRow; i++){
    if(webAppSheet.getRange(i, 3).getValue() == username){
      userStatus = webAppSheet.getRange(i, 7).getValue().toString().toUpperCase();
    }
  }
  return(userStatus);
}

function checkMemberType(username){
  var url1 = 'https://docs.google.com/spreadsheets/d/1lRKzrHwzaaWLfW8quisChJgkEzN6AzgOdQDQbW0yV1U/edit#gid=0';
  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url1);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var getLastRow =  webAppSheet.getLastRow();
  var userType = '';
  for(var i = 1; i <= getLastRow; i++){
    if(webAppSheet.getRange(i, 3).getValue() == username){
      userType = webAppSheet.getRange(i, 5).getValue().toString().toUpperCase();
    }
  }
  return(userType);
}

function changeMemberStatus(username){
  var url1 = 'https://docs.google.com/spreadsheets/d/1lRKzrHwzaaWLfW8quisChJgkEzN6AzgOdQDQbW0yV1U/edit#gid=0';
  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url1);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var getLastRow =  webAppSheet.getLastRow();
  var newUser = '';
  var successful = 'FALSE';
  for(var i = 1; i <= getLastRow; i++){
    if(webAppSheet.getRange(i, 3).getValue() == username){
      newUser = webAppSheet.getRange(i, 7).getValue().toString().toUpperCase();
      if(newUser === 'TRUE'){
        SpreadsheetApp.openByUrl(url1).getSheetByName("Sheet1").getRange(i, 7).setValue("FALSE")
        successful = 'TRUE';
      }
    }
  }
  return successful;
}

function checkLogin(username, password) {
  var url1 = 'https://docs.google.com/spreadsheets/d/1lRKzrHwzaaWLfW8quisChJgkEzN6AzgOdQDQbW0yV1U/edit#gid=0';
  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url1);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var getLastRow =  webAppSheet.getLastRow();
  var found_record = '';
  for(var i = 1; i <= getLastRow; i++)
  {
   if(webAppSheet.getRange(i, 3).getValue() == username && 
     webAppSheet.getRange(i, 4).getValue() == password)
    {
      found_record = 'TRUE';
      userFirstName = webAppSheet.getRange(i, 1).getValue();
      userLastName = webAppSheet.getRange(i,2).getValue();
    }    
  }
  if(found_record == '')
  {
    found_record = 'FALSE'; 
  }
  
  return found_record;
}




