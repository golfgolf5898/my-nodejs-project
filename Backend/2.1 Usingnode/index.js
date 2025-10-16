/*const fs = require("fs");

/*fs.writeFile("message.txt", "Hello from node js", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});

fs.readFile("./message.txt","utf-8",(err,data) => {
    if (err) throw err;
    console.log(data);
});*/
//var generateName = require("sillyname");
/*import generateName from "sillyname";
var sillyname = generateName();

console.log(`My name is ${sillyname}.`);*/

import {randomSuperheroes} from 'superheroes';

console.log(`I am ${randomSuperheroes()}!`);
