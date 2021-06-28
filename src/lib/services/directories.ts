import FileCommand from "./fileCommand";
import { FolderManager } from "./folderManager";
import OutputFileLog from "./outputFileLog";
import readline = require('readline');
import fs = require('fs');
require('dotenv').config();

var file = process.env.COMMAND_FILE_PATH;


function execCommand() {
    const outputFileLog = new OutputFileLog();
    const fileCommand = new FileCommand(new FolderManager(), outputFileLog);
    outputFileLog.cleanFile();

    var rl = readline.createInterface({
        input: fs.createReadStream(file),
        output: process.stdout,
        terminal: false
    });
    rl.on('line', function (line) {
        fileCommand.executeCommand(line);

    });

    rl.on('close', function (line) {
        outputFileLog.readFile();

    });
};

execCommand();
