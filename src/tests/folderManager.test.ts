import { IFolderManager } from '../lib/model/IFolderManager';
import { FolderManager } from '../lib/services/folderManager';
import OutputFileLog from '../lib/services/outputFileLog';

describe('Should be able to manage directories', () => {
    let folderManager: IFolderManager;
    let outputFileLog: OutputFileLog;

    beforeEach(() => {
        outputFileLog = new OutputFileLog();
        folderManager = new FolderManager();
        outputFileLog.cleanFile();
    });

    it('Should be able to create a folder', () => {
        let folderDirectory = {};
        let folderToCreate = 'fruits';
        let keys = folderToCreate.split('/');
        let response = folderManager.createItem(folderDirectory, keys);
        let expectedFolder = {
            fruits: {},
        };
        expect(JSON.stringify(response)).toBe(JSON.stringify(expectedFolder));
    });

    it('Should be able to move a folder', () => {
        let folderDirectory = {
            fruits: {
                apples: {
                    fuji: {
                    },
                },
            },
            vegetables: {
            },
            grains: {
            },
        };
        let folderToDest = 'vegetables';
        let keys = folderToDest.split('/');
        let folderToMove = {
            squash: {
            },
        };
        //Move folder to new directory
        let response = folderManager.moveItem(folderDirectory, keys, folderToMove);
        let expectedFolders = {
            fruits: {
                apples: {
                    fuji: {
                    },
                },
            },
            vegetables: {
                squash: {
                },
            },
            grains: {
            },
        };
        expect(JSON.stringify(response)).toBe(JSON.stringify(expectedFolders));
    });

    it('Should be able to delete folder with the correct path', () => {
        let folderDirectory = {
            foods: {
                grains: {
                },
                fruits: {
                    apples: {
                        fuji: {
                        },
                    },
                },
                vegetables: {
                    squash: {
                    },
                },
            },
        };
        let folderToRemove = 'fruits/apples';
        let keys = folderToRemove.split('/');
        let response = folderManager.deleteFolder(folderDirectory, keys);
        expect(response.message).toBe('Cannot delete fruits/apples - fruits does not exist');
    });

    it('Should be able to find a nested folder on the directory', () => {
        let folderDirectory = {
            fruits: {
                apples: {
                    fuji: {
                    },
                },
            },
            vegetables: {
            },
            grains: {
                squash: {
                },
            },
        };
        let folderToDest = 'fruits/apples/fuji';
        let keys = folderToDest.split('/');

        //Search for a nested object on the file object
        let response = folderManager.findNestedItem(folderDirectory, keys, false);
        let expectedFolders = {
            key: 'fuji',
            item: {
                fuji: {
                },
            },
            isValid: true
        };
        expect(JSON.stringify(response)).toBe(JSON.stringify(expectedFolders));
    });

    it('Should be able to remove the specify folder', () => {
        let folderDirectory = {
            foods: {
                grains: {
                },
                fruits: {
                    apples: {
                        fuji: {
                        },
                    },
                },
                vegetables: {
                    squash: {
                    },
                },
            },
        };
        let folderToDelete = 'apples';
        let response = folderManager.removeItem(folderDirectory, folderToDelete);
        let expectedFolder = {
            foods: {
                grains: {
                },
                fruits: {
                },
                vegetables: {
                    squash: {
                    },
                },
            },
        };
        expect(JSON.stringify(response)).toBe(JSON.stringify(expectedFolder));
    });
});
