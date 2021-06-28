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

    public readFile(): string {
        let data: string;
        data = fs.readFileSync(file).toString();
        return data;
    }
}

export default OutputFileLog;
