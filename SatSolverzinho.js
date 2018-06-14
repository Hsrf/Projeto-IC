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
  var stringAllClauses = ""
  for (i = 0; i < text.length; i++) {
    if (text[i].charAt(0) != "p" && text[i].charAt(0) != "c" && text[i].charAt(0) != "") {
      stringAllClauses += text[i]
    }
  }
  var clauses = stringAllClauses.split("0")
  return clauses
}

function readVariables(text) {
  
}

function checkProblemSpecification(text, clauses, variables) {

}
