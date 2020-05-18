"use strict";
//#region Constants
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var n = null;
var boardLength = 9;
//#endregion
//#region Board Examples
// Board description => board[vertical row Y][horizontal column X]
var emptyBoard = [
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n],
    [n, n, n, n, n, n, n, n, n]
];
var exampleBoard = [
    [n, 3, n, n, 1, n, n, 6, n],
    [7, 5, n, n, 3, n, n, 4, 8],
    [n, n, 6, 9, 8, 4, 3, n, n],
    [n, n, 3, n, n, n, 8, n, n],
    [9, 1, 2, n, n, n, 6, 7, 4],
    [n, n, 4, n, n, n, 5, n, n],
    [n, n, 1, 6, 7, 5, 2, n, n],
    [6, 8, n, n, 9, n, n, 1, 5],
    [n, 9, n, n, 4, n, n, 3, n]
];
var exampleBoard2 = [
    [5, n, 9, n, n, n, n, n, 7],
    [n, 8, n, n, 1, n, 5, 2, n],
    [n, n, 3, n, 8, 4, n, n, 1],
    [n, 9, n, 7, n, n, n, n, 2],
    [4, n, n, n, 5, n, 3, 9, n],
    [8, n, 2, 1, n, n, n, n, 4],
    [n, n, n, 3, n, 2, n, n, 5],
    [n, 4, n, n, n, n, 7, n, n],
    [1, n, 7, n, 9, n, n, 8, n]
];
var exampleBoard3 = [
    [5, 5, 9, n, n, n, n, n, 7],
    [n, 8, n, n, 1, n, 5, 2, n],
    [n, n, 3, n, 8, 4, n, n, 1],
    [n, 9, n, 7, n, n, n, n, 2],
    [4, n, n, n, 5, n, 3, 9, n],
    [8, n, 2, 1, n, n, n, n, 4],
    [n, n, n, 3, n, 2, n, n, 5],
    [n, 4, n, n, n, n, 7, n, n],
    [1, n, 7, n, 9, n, n, 8, n]
];
var exampleBoard4 = [
    [1, n, n, n, n, n, n, n, n],
    [n, 2, 8, 1, 4, 5, 6, 7, 3],
    [3, n, n, n, n, n, n, n, n],
    [4, n, n, n, n, n, n, n, n],
    [5, n, n, n, n, n, n, n, n],
    [6, n, n, n, n, n, n, n, n],
    [7, n, n, n, n, n, n, n, n],
    [8, n, n, n, n, n, n, n, n],
    [9, n, n, n, n, n, n, n, n]
];
var exampleBoard5 = [
    [1, 2, 3, 4, 5, 6, 7, 8, n],
    [n, n, n, n, n, n, n, n, 2],
    [n, n, n, n, n, n, n, n, 3],
    [n, n, n, n, n, n, n, n, 4],
    [n, n, n, n, n, n, n, n, 5],
    [n, n, n, n, n, n, n, n, 6],
    [n, n, n, n, n, n, n, n, 7],
    [n, n, n, n, n, n, n, n, 8],
    [n, n, n, n, n, n, n, n, 9]
];
var exampleBoard6 = [
    [1, n, n, n, n, n, n, n, n],
    [2, n, n, n, n, n, n, n, n],
    [3, n, n, n, n, n, n, n, n],
    [4, n, n, n, n, n, n, n, n],
    [5, n, n, n, n, n, n, n, n],
    [6, n, n, n, n, n, n, n, n],
    [7, n, n, n, n, n, n, n, n],
    [8, n, n, n, n, n, n, n, n],
    [n, 2, 3, 4, 5, 6, 7, 8, 9]
];
//#endregion
//#region Logic
var Solve = function (board) {
    if (IsBoardCompleted(board)) {
        // Stops the recurssion, solution has been found here.
        return board;
    }
    else {
        // Generate possible boards.
        var possibleBoards = GeneratePossibleBoards(board);
        // Filter those possible boards.
        var validatedPossibleBoards = ValidateBoards(possibleBoards);
        // Search for completed board.
        return FindCompletedBoard(validatedPossibleBoards);
    }
};
var IsBoardCompleted = function (board) {
    // Finds any empty box in the board, if it does, board is not complete.
    // If board is complete, that board is the correct solution as we stop filling any boards that are not valid.
    for (var i = 0; i < boardLength; i++) {
        for (var j = 0; j < boardLength; j++) {
            if (board[i][j] == null)
                return false;
        }
    }
    return true;
};
var GeneratePossibleBoards = function (board) {
    var boards = [];
    var coordinateOfFirstEmptyBox = GetCoordinateFirstEmptyBox(board);
    // Only do this if the emptybox coordinate is found.
    if (coordinateOfFirstEmptyBox != undefined) {
        // Index starts with one to get [1, 2, ... 9].
        for (var i = 1; i <= 9; i++) {
            var duplicateBoard = __spreadArrays(board);
            var duplicateRow = __spreadArrays(duplicateBoard[coordinateOfFirstEmptyBox[0]]); // Y coordinate, grabs that whole row.
            duplicateRow[coordinateOfFirstEmptyBox[1]] = i; // X coordinate, change a box from that row being extracted.
            duplicateBoard[coordinateOfFirstEmptyBox[0]] = duplicateRow; // Inserts that modified row back to the board.
            boards.push(duplicateBoard);
        }
    }
    return boards;
};
var GetCoordinateFirstEmptyBox = function (board) {
    // Loop goes vertically first, then horizontally.
    for (var x = 0; x < boardLength; x++) {
        for (var y = 0; y < boardLength; y++) {
            if (board[y][x] == null) {
                // Let coordinate be [y,x], x being horizontal, y being vertical.
                return [y, x];
            }
        }
    }
};
var ValidateBoards = function (boards) {
    var validBoards = [];
    for (var i = 0; i < boards.length; i++) {
        if (ValidateBoard(boards[i])) {
            validBoards.push(boards[i]);
        }
    }
    return validBoards;
};
var ValidateBoard = function (board) {
    var rowsAreValid = ValidateRows(board);
    var columnsAreValid = ValidateColumns(board);
    var boxesAreValid = ValidateBoxes(board);
    if (rowsAreValid && columnsAreValid && boxesAreValid)
        return true;
    return false;
};
var ValidateRows = function (board) {
    for (var i = 0; i < boardLength; i++) {
        var rowElements = [];
        for (var j = 0; j < boardLength; j++) {
            var boxElement = board[i][j];
            if (rowElements.includes(boxElement)) {
                return false;
            }
            else if (boxElement != null) { // Do not push empty boxes.
                rowElements.push(boxElement);
            }
        }
    }
    return true;
};
var ValidateColumns = function (board) {
    for (var i = 0; i < boardLength; i++) {
        var columnElements = [];
        for (var j = 0; j < boardLength; j++) {
            var boxElement = board[j][i];
            if (columnElements.includes(boxElement)) {
                return false;
            }
            else if (boxElement != null) { // Do not push empty boxes.
                columnElements.push(boxElement);
            }
        }
    }
    return true;
};
var ValidateBoxes = function (board) {
    // Coordinate for a single box being checked.
    var coordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];
    for (var i = 0; i < boardLength; i += 3) {
        for (var j = 0; j < boardLength; j += 3) {
            var boxElements = [];
            for (var k = 0; k < 9; k++) {
                var duplicateCoordinates = __spreadArrays(coordinates[k]);
                duplicateCoordinates[0] += i; // Row modifier depending on the box being checked.
                duplicateCoordinates[1] += j; // Column modifier depending on the box being checked.
                if (boxElements.includes(board[duplicateCoordinates[0]][duplicateCoordinates[1]])) {
                    return false;
                }
                else if (board[duplicateCoordinates[0]][duplicateCoordinates[1]] != null) { // Do not push empty boxes.
                    boxElements.push(board[duplicateCoordinates[0]][duplicateCoordinates[1]]);
                }
            }
        }
    }
    return true;
};
var FindCompletedBoard = function (boards) {
    if (boards.length < 1) {
        // No valid boards. Reached a deadend here.
        return null;
    }
    else {
        // Backtracking search to find board with solution.
        var currentBoard = boards.shift();
        var boardTreePath = Solve(currentBoard);
        if (boardTreePath != null) {
            return boardTreePath;
        }
        else {
            // That path leads us into a board that has no solution, need to backtrack
            // List of boards have been changed (through the shift function), meaning that the invalid board has been removed from the list of boards.
            // Analogy: Moving horizontally into the other tree since the current tree is leading into a deadend (board with wrong solution)
            return FindCompletedBoard(boards);
        }
    }
};
//#endregion
//#region Helper Methods
var SolveSudokuBoard = function () {
    var questionBoard = ReadBoardFromQuestion();
    var inputsAreValid = ValidateBoxInput();
    var questionIsValid = ValidateBoard(questionBoard);
    if (inputsAreValid && questionIsValid) {
        var answerBoard = Solve(questionBoard);
        if (answerBoard !== null) {
            MapBoardToAnswer(answerBoard);
        }
        else {
            alert("This sudoku question Board is invalid! Please change the question board.");
        }
    }
    else if (!inputsAreValid) {
        alert("One of the boxes in this sudoku question Board is invalid as they contain a double digit number! Please change the question board");
    }
    else {
        alert("This sudoku question Board is invalid! Please change the question board.");
    }
};
var ReadBoardFromQuestion = function () {
    var input = [[]];
    var j = 0;
    for (var i = 1; i <= 81; i++) {
        var box = document.getElementById("box-" + i).value;
        if (box == "") {
            input[j].push(null);
        }
        else {
            input[j].push(Number(box));
        }
        if (i % 9 == 0 && i < 81) {
            input.push([]);
            j++;
        }
    }
    return input;
};
var MapBoardToAnswer = function (board) {
    var indexCounter = 1;
    for (var j = 0; j < boardLength; j++) {
        for (var i = 0; i < boardLength; i++) {
            var value = board[j][i];
            if (value === null) {
                indexCounter++;
            }
            else {
                document.getElementById("ans-" + indexCounter).value = String(value);
                indexCounter++;
            }
        }
    }
};
var MapBoardToQuestion = function (board) {
    var indexCounter = 1;
    for (var j = 0; j < boardLength; j++) {
        for (var i = 0; i < boardLength; i++) {
            var value = board[j][i];
            if (value === null) {
                indexCounter++;
            }
            else {
                document.getElementById("box-" + indexCounter).value = String(value);
                indexCounter++;
            }
        }
    }
};
var MapEmptyBoardToQuestion = function () {
    for (var i = 1; i <= 81; i++) {
        document.getElementById("box-" + i).removeAttribute("value");
        document.getElementById("box-" + i).value = "";
    }
};
var MapEmptyBoardToAnswer = function () {
    for (var i = 1; i <= 81; i++) {
        document.getElementById("ans-" + i).removeAttribute("value");
        document.getElementById("ans-" + i).value = "";
    }
};
var ValidateBoxInput = function () {
    for (var i = 1; i <= 81; i++) {
        var num = document.getElementById("box-" + i).value;
        if (num.length > 1)
            return false;
    }
    return true;
};
//#endregion
//#region Button Event Listeners
// var solveButton = document.getElementById("solveButton");
// solveButton.addEventListener('click',() => {
//     SolveSudokuBoard();
// });
var onSolveButtonClicked = function () {
    SolveSudokuBoard();
};
// var fillButton = document.getElementById("fillButton");
// fillButton.addEventListener('click',() => {
//     MapEmptyBoardToQuestion();
//     MapBoardToQuestion(exampleBoard2);
//     MapEmptyBoardToAnswer();
// });
var onFillButtonClicked = function () {
    MapBoardToQuestion(exampleBoard2);
};
// var clearButton = document.getElementById("clearButton");
// clearButton.addEventListener('click', () => {
//     MapEmptyBoardToQuestion();
//     MapEmptyBoardToAnswer();
// });
var onClearButtonClicked = function () {
    MapEmptyBoardToQuestion();
    MapEmptyBoardToAnswer();
};
//#endregion
//# sourceMappingURL=index.js.map