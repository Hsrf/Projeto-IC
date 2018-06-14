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

  var text = readEstaPorra("simple1.cnf");
  var clauses = readClauses(text);
  console.log(clauses);