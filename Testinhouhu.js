var fs = require('fs');

function readEstaPorra(fileName) {
    var text = fs.readFileSync(fileName).toString().split('\n');
    return text;
}
function readClauses(text) {
    var stringAllClauses = "";
    for (i = 0; i < text.length; i++) {
      if (text[i].charAt(0) != "p" && text[i].charAt(0) != "c" && text[i].charAt(0) != "") {
        stringAllClauses += text[i];
      }
    }
    var clausesArray = stringAllClauses.split("0");
    var clauses = [];

    for (i = 0; i < clausesArray.length; i++) {
       clauses[i] = clausesArray[i].split(" ");
    } 
    for (i = 0; i < clauses.length; i++) {
        clauses[i].pop();
    }
    clauses.pop();
    return clauses;
  }

  function readVariables(clauses) { var absoluteClauses = clauses, existingVariables = [], variables = [], existsAlready = false;
   for (i = 0; i < clauses.length; i ++) {
          for (j = 0; j < clauses[i].length; j++) { absoluteClauses[i][j] = Math.abs(absoluteClauses[i][j]);}}
      for (i = 0; i < clauses.length; i++) {
          for (j = 0; j < clauses[i].length; j++) {  existsAlready = false;
              for (k = 0; k < existingVariables.length; k++) {
                  if (absoluteClauses[i][j] == existingVariables[k]) {    existsAlready = true;  } }
              if (!existsAlready) {   existingVariables.push(clauses[i][j]); variables.push(0); }}} return variables;}

function checkProblemSpecification(text, clauses, variables) {
    var words = [];
    for (i = 0; i < text.length; i++) {
      if (text[i].charAt(0) == "p") {
        words = text[i].split(" ");
      }
    }
    var amountVariables = words[2];
    var amountClauses = words[3];
  
    if (variables.length == amountVariables && clauses.length == amountClauses) {
      return true;
    } else {
      return false;
    }
  }

var text = readEstaPorra("simple2.cnf");
var clauses = readClauses(text);
var variables = readVariables(clauses);
var check = checkProblemSpecification(text, clauses, variables);
console.log(check);