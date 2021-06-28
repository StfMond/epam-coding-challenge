import FileCommand from './fileCommand';
import { FolderManager } from './folderManager';
import OutputFileLog from './outputFileLog';
import readline = require('readline');
import fs = require('fs');
require('dotenv').config();

const outputFileLog = new OutputFileLog();
var file = process.env.COMMAND_FILE_PATH;
var rl = readline.createInterface({
    input: fs.createReadStream(file),
    output: process.stdout,
    terminal: false
});


function fileCommand() {
    const fileCommand = new FileCommand(new FolderManager(), outputFileLog);
    outputFileLog.cleanFile();

    rl.on('line', function (line) {
        fileCommand.executeCommand(line);

    });

    resultCommand();
};

function resultCommand() {
    rl.on('close', () => {
        console.log(outputFileLog.readFile());
    });
};

fileCommand();

