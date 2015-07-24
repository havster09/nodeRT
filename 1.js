function printHelp() {
    console.log("2.js usage:");
    console.log("");
    console.log("--help              print this help");
    console.log("--file={FILENAME}   which file to load");
    console.log("");
    console.log("");
}


var args = require("minimist")(process.argv.slice(2),{string:"file"});

if ("help" in args || !args.file) {
    printHelp();
    process.exit(1);
}

var hello = require("./helloworld.js");

hello.say(args.file);