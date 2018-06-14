/**
 * This file should be placed at the node_modules sub-directory of the directory where you're 
 * executing it.
 * 
 * Written by Fernando Castor in November/2017. 
 */
var fs = require('fs');

exports.solve = function(fileName) {
  let formula = propsat.readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
  return result // two fields: isSat and satisfyingAssignment
}

// Receives the current assignment and produces the next one
function nextAssignment(currentAssignment) {
  // implement here the code to produce the next assignment based on currentAssignment. 
  return newAssignment
}

function doSolve(clauses, assignment) {
  let isSat = false
  while ((!isSat) && /* must check whether this is the last assignment or not*/) {
    // does this assignment satisfy the formula? If so, make isSat true. 

    // if not, get the next assignment and try again. 
    assignment = nextAssignment(assignment)
  }
  let result = {'isSat': isSat, satisfyingAssignment: null}
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result
}
  
function readFormula(fileName) {
  // To read the file, it is possible to use the 'fs' module. 
  // Use function readFileSync and not readFile. 
  // First read the lines of text of the file and only afterward use the auxiliary functions.
  var text = fs.readFileSync(fileName).toString().split('\n');
  let clauses = readClauses(text)
  let variables = readVariables(clauses)
  let specOk = checkProblemSpecification(text, clauses, variables)

  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  return result
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

function readVariables(clauses) {
  var absoluteClauses = clauses;
  var existingVariables = [];
  var variables = [];
  var existsAlready = false;

    for (i = 0; i < clauses.length; i ++) {
        for (j = 0; j < clauses[i].length; j++) {
          absoluteClauses[i][j] = Math.abs(absoluteClauses[i][j]);
        }
    }

    for (i = 0; i < clauses.length; i++) {
        for (j = 0; j < clauses[i].length; j++) {
          existsAlready = false;
            for (k = 0; k < existingVariables.length; k++) {
                if (absoluteClauses[i][j] == existingVariables[k]) {
                  existsAlready = true;
                }
            }
            if (!existsAlready) {
              existingVariables.push(clauses[i][j]);
              variables.push(0);
            }
        }
    }

    return variables;
}

function checkProblemSpecification(text, clauses, variables) {

}
