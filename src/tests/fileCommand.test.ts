import FileCommand from '../lib/services/fileCommand';
import { FolderManager } from '../lib/services/folderManager';
import OutputFileLog from '../lib/services/outputFileLog';

describe('Should be execute command line for action on directories', () => {
    let fileCommand: FileCommand;
    let outputFileLog: OutputFileLog;

    beforeEach(() => {
        outputFileLog = new OutputFileLog();
        fileCommand = new FileCommand(new FolderManager(), outputFileLog);
        outputFileLog.cleanFile();
    });

    it('Should be create one level directory instruction', () => {
        let command = 'CREATE fruits';
        fileCommand.executeCommand(command);
        let result = outputFileLog.readFile();
        expect(result).toBe(command + '\r\n');
    });

    it('Should be create two level directory instruction', () => {
        let command = 'CREATE fruits/apples';
        fileCommand.executeCommand(command);
        let result = outputFileLog.readFile();
        expect(result).toBe(command + '\r\n');
    });

    it('Should be delete child instruction', () => {
        let commands = [
            'CREATE fruits',
            'CREATE fruits/apples',
            'CREATE fruits/apples/fuji',
            'DELETE fruits/apples',
            'LIST'
        ];
        let expectedResult =
            'CREATE fruits\r\n'
            + 'CREATE fruits/apples\r\n'
            + 'CREATE fruits/apples/fuji\r\n'
            + 'DELETE fruits/apples\r\n'
            + 'LIST\r\n'
            + ' fruits\r\n';

        commands.forEach(cmd => {
            fileCommand.executeCommand(cmd);
        });
        let result = outputFileLog.readFile();
        expect(result).toBe(expectedResult);
    });

    it('Should be move child instruction', () => {
        let commands = [
            'CREATE fruits',
            'CREATE vegetables',
            'CREATE grains',
            'CREATE fruits/apples',
            'CREATE fruits/apples/fuji',
            'CREATE grains/squash',
            'MOVE grains/squash vegetables',
            'LIST'
        ];
        let expectedResult =
            'CREATE fruits\r\n'
            + 'CREATE vegetables\r\n'
            + 'CREATE grains\r\n'
            + 'CREATE fruits/apples\r\n'
            + 'CREATE fruits/apples/fuji\r\n'
            + 'CREATE grains/squash\r\n'
            + 'MOVE grains/squash vegetables\r\n'
            + 'LIST\r\n'
            + ' fruits \n'
            + '  apples \n'
            + '   fuji \n'
            + ' vegetables \n'
            + '  squash \n'
            + ' grains\r\n';

        commands.forEach(cmd => {
            fileCommand.executeCommand(cmd);
        });
        let result = outputFileLog.readFile();
        expect(result).toBe(expectedResult);
    });
});
