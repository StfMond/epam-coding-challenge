'use strict';
let files = {};

const lineReader = require('line-reader');

lineReader.eachLine('commands.txt', function (line) {
    getCommand(line);
});

function createItem(folderItems, keys) {
    let item = folderItems;
    let folder = {};
    keys.forEach((elem) => {
        item[elem] = item[elem] || {};
        item = item[elem];
        folder = { [elem]: item || {} };

    });
    return folder;
}

function moveItem(folderItems, keys, folderDest) {
    let keyTo = keys[keys.length - 1];
    folderItems[keyTo] = Object.assign(folderItems[keyTo], folderDest);
    return folderItems;
}

function removeItem(folderStr, item) {
    files = JSON.parse(folderStr, (key, value) => {
        if (key !== item) return value;
    });
};

function deleteFolder(path) {
    let validItem = findNestedObj(files, path, true);

    if (!validItem.isValid)
        console.log(`Cannot delete  ${path} - ${validItem.key} does not exist`);

}

function findNestedObj(entireObj, keys, deleteObject) {
    let obj = {};
    let result = {};
    let path = keys;
    obj = entireObj[path[0]];
    if (obj === undefined)
        return { key: path[0], isValid: false };

    if (path.length == 1) {
        if (deleteObject) removeItem(JSON.stringify(files), path[0]);
        return { key: path[0], item: { [path[0]]: obj || {} }, isValid: true };
    }

    path.shift();
    let pathToFind = path.join('/');
    result = findNestedObj(obj, pathToFind.split('/'), deleteObject);
    return result;

};

function getCommand(command) {
    let inst = command.split(" ");
    let key = inst[1];
    let parent = inst[2] !== undefined ? inst[2].split('/') : {};
    let keys = inst[1] !== undefined ? inst[1].split('/') : {};
    console.log(command);

    switch (inst[0]) {
        case "CREATE":
            createItem(files, keys);
            break;
        case "MOVE":
            let object = findNestedObj(files, keys);
            let lastKey = keys[keys.length - 1];
            removeItem(JSON.stringify(files), lastKey);
            files = moveItem(files, parent, object.item);
            break;
        case "LIST":
            let listItems = JSON.stringify(files, null, 4).replace(/[{}:,^"]/g, '').replace(/(^[ \t]*\n)/gm, '');
            console.log(listItems);
            break;
        case "DELETE":
            let message = deleteFolder(keys);
            if (message !== undefined) console.log(message);
            break;
        default:
            break;
    }
}