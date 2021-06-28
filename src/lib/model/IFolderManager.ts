import { ResponseFolder } from "./responseFolder";

export interface IFolderManager {
    createItem(folders: object, keys: []): object;
    moveItem(folders: object, keys: [], folderDest: object): [];
    removeItem(folders: object, itemToRemove: string): [];
    deleteFolder(folders: object, path: string[]): ResponseFolder;
    findNestedItem(foldersObj: any, keys: string[], removeItem: boolean): ResponseFolder;
}