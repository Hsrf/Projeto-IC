var fs = require('fs');

const readFile = (name) => fs.readFileSync(name).toString().substring(1);
console.log(readFile("TESAO.txt"));