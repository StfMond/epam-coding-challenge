# Code Challege EPAM Directory move folder

---

## Requirements

Allow to recieve commands to move folders

## Install

    $ git clone https://github.com/StfMond/epam-coding-challenge or UnZip Folder
    $ cd epam-coding-challenge
    $ npm install

## Configure app

Open `commands.txt` update the commands that you want to execute:

CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST

## Running the project

    $ npm run build
    $ npm run start

## Test Execution

    $ npm run test

## Coverage Report

    $ npm run test:coverage

## Linting/Rules

    $ npm run lint
