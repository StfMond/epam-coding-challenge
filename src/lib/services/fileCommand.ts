import { IFolderManager } from '../model/IFolderManager';
import { Instruction } from '../model/instruction';
import OutputFileLog from './outputFileLog';

class FileCommand {
    private _folderManager: IFolderManager;
    private _outputFileLog: OutputFileLog;
    private files = {};
    constructor(folderManager: IFolderManager, outputFileLog: OutputFileLog) {
        this._folderManager = folderManager;
        this._outputFileLog = outputFileLog;
    }

    public executeCommand(commandLine) {
        let inst = commandLine.split(' ');
        let parent = inst[2] !== undefined ? inst[2].split('/') : {};
        let keys = inst[1] !== undefined ? inst[1].split('/') : {};
        let command = (<any>Instruction)[inst[0]];
        let output = null;

        switch (command) {
            case Instruction.CREATE:
                this._folderManager.createItem(this.files, keys);
                break;
            case Instruction.MOVE:
                let object = this._folderManager.findNestedItem(this.files, keys, false);
                let lastKey = keys[keys.length - 1];
                this.files = this._folderManager.removeItem(this.files, lastKey);
                this.files = this._folderManager.moveItem(this.files, parent, object.item);
                break;
            case Instruction.LIST:
                let listItems = JSON.stringify(this.files, null, 1)
                    .replace(/[{}:,^"]/g, '')
                    .replace(/(^[ \t]*\n)/gm, '')
                    .trimEnd();
                output = listItems;
                break;
            case Instruction.DELETE:
                let response = this._folderManager.deleteFolder(this.files, keys);
                this.files = response.files || this.files;
                if (response.message !== undefined) output = response.message;
                break;
            default:
                break;
        }

        this._outputFileLog.writeOutput(commandLine);
        if (output != null) this._outputFileLog.writeOutput(output);
    }
}

export default FileCommand;
