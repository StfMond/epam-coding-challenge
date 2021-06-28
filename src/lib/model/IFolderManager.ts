import { ResponseFolder } from './responseFolder';

export interface IFolderManager {
    createItem(folders: object, keys: string[]): object;
    moveItem(folders: object, keys: string[], folderDest: object): [];
    removeItem(folders: object, itemToRemove: string): [];
    deleteFolder(folders: object, path: string[]): ResponseFolder;
    findNestedItem(foldersObj: any, keys: string[], removeItem: boolean): ResponseFolder;
}