//Author: Justin Light

function loadLogin() {
  return HtmlService.createTemplateFromFile("Login").evaluate();
}

function loadProfile() {
  return HtmlService.createTemplateFromFile("Profile").evaluate();
}
