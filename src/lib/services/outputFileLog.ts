import fs = require('fs');
require('dotenv').config();

var file = process.env.RESULT_FILE_PATH;


class OutputFileLog {

    public writeOutput(output: string) {
        fs.appendFileSync(file, output + '\r\n');
    }

    public cleanFile() {
        fs.truncateSync(file, 0);
    }

    public readFile() {
        fs.readFile(file, 'utf8', function (err, data) {
            if (err) throw err;
            console.log(data)
        });
    }
}

export default OutputFileLog;
