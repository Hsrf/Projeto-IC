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

function doSolve(variables, clauses){
  var contador = 1;
let isSat = false
while ((!isSat) && variables[0] != "x") {
    var notTheseVar = false;
    for(i = 0; i < clauses.length && !notTheseVar; i++) {
         var trueClause = false;
         for(j = 0; j < clauses[i].length && !trueClause ; j ++) {
             if(parseInt(clauses[i][j]) > 0 && variables[(Math.abs(parseInt(clauses[i][j])) - 1)] == 1){
                 trueClause = true;
            }else if(parseInt(clauses[i][j]) < 0 && variables[(Math.abs(parseInt(clauses[i][j])) - 1)] == 0){
                 trueClause = true;
            }
         }
         if (!trueClause) {
            notTheseVar = true;
    }
    }
    if (notTheseVar) {
        console.log(contador);
        contador++;
        variables = nextAssignment(variables);
    } else {
        isSat = true;
    }
}
let result = {'isSat': isSat, satisfyingAssignment: null}
if (isSat) {
  result.satisfyingAssignment = variables;
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
      stringAllClauses += " " + text[i];
    }
  }
  var clausesArray = stringAllClauses.split(" 0");
  var clauses = [];

  for (i = 0; i < clausesArray.length; i++) {
     clauses[i] = clausesArray[i].split(" ");
  } 
  for (i = 0; i < clauses.length; i++) {
      clauses[i].shift();
  }
  clauses.pop();
  return clauses;
}

function readVariables(clauses) { 
  var absoluteClauses = [];
  var existingVariables = [];
  var variables = [];
  var existsAlready = false;

 for (i = 0; i < clauses.length; i ++) {
   absoluteClauses[i] = [];
        for (j = 0; j < clauses[i].length; j++) {
           absoluteClauses[i][j] = Math.abs(clauses[i][j]);
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
                existingVariables.push(absoluteClauses[i][j]);
                variables.push(0);
              }
            }
          } 

            return variables;

   }

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

  function nextAssignment(variables){
    var oldBinary = "";
    for(i = 0; i < variables.length; i ++){
      oldBinary += variables[i];
    }

    var oldDecimal = convertToDecimal(oldBinary);
    var newDecimal = oldDecimal + 1;
  
    if (newDecimal == Math.pow(2,variables.length)) {
      return ["x"];
    }
    else {
      var newBinary = convertToBinary(newDecimal);
      aux = variables.length - newBinary.length;
      for(j = 0; j < aux; j++){
         newBinary = "0" + newBinary;
     }
      for(i = 0 ; i < variables.length; i++){
        variables[i] = newBinary.charAt(i);
     }
     return variables;
   }
  }

  function convertToBinary(numberD){
    var result = '';
    while(numberD > 0){
      result = (numberD % 2) + result;
      numberD = numberD / 2;
      numberD = numberD.toString();
      numberD = parseInt(numberD);
    }
    if(numberD != 0){
    result = numberD + result;
    }
    return result;
  }

  function convertToDecimal(numberB){
   //ESSA FUNCAO TEM QUE SER CHAMADA COM STRING OU VAI DAR MERDA
    result = 0;
    var power = 0;
    for(i = numberB.length - 1; i >= 0; i--){
      result += numberB.charAt(i) * Math.pow(2, power);
      power++;
    }
    return result;
  }