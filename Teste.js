var fs = require('fs');

function readEstaPorra(fileName) {
    var text = fs.readFileSync(fileName).toString();
    text = text.substring(1,text.length-1);
    return text;
}

var queroSoVer = readEstaPorra("TESAO.txt");
console.log(queroSoVer);