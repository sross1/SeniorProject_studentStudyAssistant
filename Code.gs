var Route = {};
Route.path = function(route, callBack) { Route[route] = callBack; }


  function doGet(e)
  {
    //Home
    Route.path("home", loadHome)
    Route.path("register", loadRegister)
    Route.path("login", loadLogin)

    //Nav-bar
    Route.path("dashboard", loadDashboard)
    Route.path("studentProfile", loadStudentProfile)
    Route.path("professorProfile", loadProfessorProfile)
    Route.path("calendar", loadCalendar)
    Route.path("feedback", loadFeedback)

    //Calc 1
    Route.path("calc1", loadCalc1)
    Route.path("calc1Notes", loadCalc1Notes)
    Route.path("calc1WS", loadCalc1WS)
    Route.path("calc1Tutoring", loadCalc1tutoring)
    Route.path("learningProgress", loadLearningProgress)

    
  

    Logger.log( Utilities.jsonStringify(e) );
    if(Route [e.parameters.v])
    {
      return Route [e.parameters.v]();
    } 
    else 
    {
      return HtmlService.createTemplateFromFile("Home").evaluate();
    }
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

function AddRecord(firstname, lastname, email, password, occupation, phoneNumber, reminders) {
  var url = 'https://docs.google.com/spreadsheets/d/1lRKzrHwzaaWLfW8quisChJgkEzN6AzgOdQDQbW0yV1U/edit#gid=0';
  //Paste URL of GOOGLE SHEET
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var rowNum = webAppSheet.getLastRow();
  var userStatus = 'TRUE'
  var record_added = '';
  webAppSheet.appendRow([firstname, lastname, email, password, occupation, new Date(), userStatus, phoneNumber, reminders]);
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
  var first_name = 'N/A';
  var last_name = 'N/A';
  var email = 'N/A';
  var phone = 'N/A';
  var password = 'N/A';
  var notifications = 'N/A';

  var url1 = 'https://docs.google.com/spreadsheets/d/1lRKzrHwzaaWLfW8quisChJgkEzN6AzgOdQDQbW0yV1U/edit#gid=0';
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
      email = webAppSheet.getRange(i, 3).getDisplayValue();
      phone = webAppSheet.getRange(i, 8).getDisplayValue();
      password = webAppSheet.getRange(i, 4).getDisplayValue();
      notifications = webAppSheet.getRange(i, 9).getDisplayValue();
    }
  }

  /*var protectedPass;
  for(var i = 0; i <= password.length(); i++){
    protectedPass = protectedPass.concat("*");
  }*/

  return [first_name, last_name, email, phone, password, notifications];
}

//Get Learning Profile Data
function getLearningProfile(username)
{
  var learning_styles = 'N/A';
  var procrastination = 'N/A';
  var online = 'N/A';

  var url1 = 'https://docs.google.com/spreadsheets/d/1bYJi7-HJ4eq4BUy4LWMqfT0ehwP44G1jZ3qzrQrDDsU/edit#gid=564535258';
  var ss= SpreadsheetApp.openByUrl(url1);
  var webAppSheet = ss.getSheetByName("Cleaned Form Data");
  var getLastRow =  webAppSheet.getLastRow();
  for(var i = 1; i <= getLastRow; i++){
    var userFromSheets = webAppSheet.getRange(i, 3).getDisplayValue();
    userFromSheets = '"'+ userFromSheets + '"';
    if(userFromSheets == username){
      learning_styles = webAppSheet.getRange(i, 7).getDisplayValue();
      procrastination = webAppSheet.getRange(i, 6).getDisplayValue();
      online = webAppSheet.getRange(i, 5).getDisplayValue();
    }
  }
  
  return [learning_styles, procrastination, online];
}

//Get Learning Style Only
function getLearningStyle(username)
{
  var learning_style = 'N/A';

  var url1 = 'https://docs.google.com/spreadsheets/d/1bYJi7-HJ4eq4BUy4LWMqfT0ehwP44G1jZ3qzrQrDDsU/edit#gid=564535258';
  var ss= SpreadsheetApp.openByUrl(url1);
  var webAppSheet = ss.getSheetByName("Cleaned Form Data");
  var getLastRow =  webAppSheet.getLastRow();
  for(var i = 1; i <= getLastRow; i++){
    var userFromSheets = webAppSheet.getRange(i, 3).getDisplayValue();
    userFromSheets = '"'+ userFromSheets + '"';
    if(userFromSheets == username){
      learning_style = webAppSheet.getRange(i, 7).getDisplayValue();
    }
  }
  
  return learning_style;
}


function addNewTask(user, taskID, taskName)
{
  var url = 'https://docs.google.com/spreadsheets/d/1kMgtTwN_0Hvh1WXXCq_Yi2Pf0PFez9uoSBFiModioRA/edit#gid=0';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var rowNum = webAppSheet.getLastRow();
  var task_added = '';
  webAppSheet.appendRow([user, taskID, taskName]);
  var newRowNum = webAppSheet.getLastRow();
  if (newRowNum > rowNum){
    task_added = 'TRUE';
  }
  else{
    task_added = 'FALSE';
  }
  
  return task_added;
}

function getTaskNames(username)
{
  var taskNames = [];
  var taskIds = [];
  var j = 0; //task index

  var url = 'https://docs.google.com/spreadsheets/d/1kMgtTwN_0Hvh1WXXCq_Yi2Pf0PFez9uoSBFiModioRA/edit#gid=0';
  var ss= SpreadsheetApp.openByUrl(url);
  var webAppSheet = ss.getSheetByName("Sheet1");
  var getLastRow =  webAppSheet.getLastRow();
  for(var i = 1; i <= getLastRow; i++){
    var userFromSheets = webAppSheet.getRange(i, 1).getDisplayValue();
    if(userFromSheets === username){
      taskIds[j] = webAppSheet.getRange(i, 2).getDisplayValue();
      taskNames[j] = webAppSheet.getRange(i, 3).getDisplayValue();
      j++; 
    }
  }

  return [taskNames, taskIds];
}
