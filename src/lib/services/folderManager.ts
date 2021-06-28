import { IFolderManager } from '../model/IFolderManager';
import { ResponseFolder } from '../model/responseFolder';

export class FolderManager implements IFolderManager {
    createItem(folders: [], keys: []): object {
        let item = folders;
        let folder = {};
        keys.forEach((elem) => {
            item[elem] = item[elem] || {};
            item = item[elem];
            folder = { [elem]: item || {} };

        });
        return folder;
    };

    moveItem(folders: [], keysDest: string[], folderToMove: object): [] {
        let keyTo = keysDest[keysDest.length - 1];
        folders[keyTo] = Object.assign(folders[keyTo], folderToMove);
        return folders;
    };

    removeItem(folders: [], itemToRemove: string): [] {
        let folderStr = JSON.stringify(folders);
        folders = JSON.parse(folderStr, (key, value) => {
            if (key !== itemToRemove) return value;
        });
        return folders;
    };

    deleteFolder(folders: [], path: string[]): ResponseFolder {
        let validItem = this.findNestedItem(folders, path, true);

        if (!validItem.isValid) {
            validItem.message = `Cannot delete ${path.join('/')} - ${validItem.key} does not exist`;
            return validItem;
        }

        let lastKey = path[path.length - 1];
        validItem.files = this.removeItem(folders, lastKey);
        return validItem;
    }

    findNestedItem(foldersObj: any, keys: string[], deleteItem: boolean): ResponseFolder {
        let obj = {};
        let result: ResponseFolder = null;
        let path = [];
        path = keys;
        obj = foldersObj[path[0]];
        if (obj === undefined)
            return { key: path[0], item: null, isValid: false };

        if (path.length == 1) {
            if (deleteItem) this.removeItem(foldersObj, path[0]);
            return { key: path[0], item: { [path[0]]: obj || {} }, isValid: true };
        }

        path.shift();
        let pathToFind = path.join('/');
        result = this.findNestedItem(obj, pathToFind.split('/'), deleteItem);
        return result;
    };
}