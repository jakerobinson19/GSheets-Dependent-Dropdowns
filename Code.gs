/*
Script for implementing dependent dropdowns in a Google Spreadsheet
8/2019
*/

// Set the main WS name which the script will apply validations to
var mainWSName = "Sheet1";

// Name of the sheet which the options will be pulled from
var optionsWSName = "Options Sheet";

// Variables which identify the columns which validations will be applied to
// Here implemented as lists for multiple dropdowns

var firstLevelColumn = 4;
var firstLevelColumns = [4,10,16,19,25];
var secondLevelColumns = [5,11,17,20,26];
 
var ws = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(mainWSName);
var wsOptions = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(optionsWSName);

// Identify the options available, which the data validation will use to create the dependent dropdowns
var options = wsOptions.getRange(2,1,wsOptions.getLastRow()-1,4).getValues();

// OnEdit is the main driver function
// It is called any time an edit is made on the active spreadsheet
// If the edited cell is not contained in the firstLevelColumns or secondLevelColumns, no data validation occurs

function OnEdit(e){
  
  var activeCell = e.range;
  var val = activeCell.getValue();
  var r = activeCell.getRow();
  var c = activeCell.getColumn();
  var wsName = activeCell.getSheet().getName();
  
  if(wsName === mainWSName && firstLevelColumns.indexOf(c) != -1 && r > 2){
   
    // Apply first level validation passing the value, row, and column of the edited cell
    applyFirstLevelValidation(val,r, secondLevelColumns[firstLevelColumns.indexOf(c)]);
  } 
  
  else if(wsName = mainWSName && secondLevelColumns.indexOf(c) != -1 && r > 2){
    
    // Apply second level validation passing the value, row, and column of the edited cell
    applySecondLevelValidation(val,r, c+1);
  }
  
}//end onEdit

// Function called if the edited cell from OnEdit is in a first level column
function applyFirstLevelValidation(val, r, c){
 
  if(val === ""){
    ws.getRange(r, c).clearContent();
    listToApply = ['Please select a First level'];
    applyValidationToCell(listToApply,ws.getRange(r, c))
    //ws.getRange(r, secondLevelColumn).clearDataValidations();
  } 
  
  else {
    ws.getRange(r, c).clearContent();
    var filteredOptions = options.filter(function(o){ return o[0] === val });
    var listToApply = filteredOptions.map(function(o){ return o[1] });
    var cell = ws.getRange(r, c);
    applyValidationToCell(listToApply,cell);
  }
  
}

// Function called if the edited cell from OnEdit is in a second level column
function applySecondLevelValidation(val, r, c){
  
  if(val === ""){
    ws.getRange(r, c).clearContent();
    listToApply = ['Please select a Second level'];
    applyValidationToCell(listToApply,ws.getRange(r, c))
    //ws.getRange(r, thirdLevelColumn).clearDataValidations();
  } 
  
  else {
    ws.getRange(r, c).clearContent();
    var firstLevelColValue = ws.getRange(r, firstLevelColumns[secondLevelColumns.indexOf(c-1)]).getValue();
    var filteredOptions = options.filter(function(o){ return o[0] === firstLevelColValue && o[1] === val });
    var listToApply = filteredOptions.map(function(o){ return o[3] });
    var cell = ws.getRange(r, c);
    applyValidationToCell(listToApply,cell);
  }
  
}

// Function that builds the data validation rules for the edited cell
function applyValidationToCell(list, cell) {
  
  var rule = SpreadsheetApp
  .newDataValidation()
  .requireValueInList(list)
  .setAllowInvalid(false)
  .build();
  
  cell.setDataValidation(rule);
  
}
