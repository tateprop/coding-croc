let boardSquares = []
let pieceOrder = ["rook", "bishop", "knight", "queen","king","knight","bishop","rook"]
let pieceMovement = {
    "rook" : {"moves" : [[1,0],[0,1]], "one": false},
    "bishop" : {"moves" : [[1,1]], "one": false},
    "knight" : {"moves" : [[2,1],[1,2]], "one": true},
    "queen" : {"moves" : [[1,0],[1,1],[0,1]], "one": false},
    "king" : {"moves" : [[1,0],[1,1],[0,1]], "one": true},
}
const pieceMoveExpanded = {}
const negatives = [[1,1], [-1,-1], [1,-1], [-1,1]];

//This is ugly and gross but i couldnt get class variables to work
let SELETED = ""
/////////////

// To Do
// 1 game loop with turns
// 2 fix pawn motion
// 3 add check detection
// 4 ceck mate detection

function expandPieceMovement(){
    for (const [key, value] of Object.entries(pieceMovement)){
        let moveList = []
        for (let i = 0; i < value["moves"].length; i++) {
            let move = value["moves"][i];
            for (let x = 0; x < 4; x++){
                let currMove = [move[0]*negatives[x][0], move[1]*negatives[x][1]]
                let loopsB = value["one"] ? 2 : 8
                let subMoveList = []
                for (let y = 1; y < loopsB; y++){
                    subMoveList.push([currMove[0]*y, currMove[1]*y])
                }
                moveList.push(subMoveList)
            }
        }
        pieceMoveExpanded[key] = moveList
    }
}
class Piece{
    constructor(pieceName, pieceColor, parent){
        this.pieceName = pieceName;
        this.pieceColor = pieceColor;
        this.hasMoved = false;
        this.parent = parent
    }
    getMoves(){
        //assume piece check has been made
        SELETED = this
        let index = this.parent.index
        if (this.pieceName == "pawn"){
            let flip = (this.pieceColor=="black") ? 1 : -1
            let loops = this.hasMoved ? 1 : 2
            let pawnMoves = []
            for (let i = 0; i < loops; i++) {
                pawnMoves.push([[0,1*flip*(i+1)]])
            }
            pieceMoveExpanded["pawn"] = pawnMoves
        }
        console.log(pieceMoveExpanded["pawn"])
        let pieceDict = pieceMoveExpanded[this.pieceName]
        for (let i = 0; i < pieceDict.length; i++) {
            let moveTree = pieceDict[i];
            for (let x = 0; x < moveTree.length; x++) {
                let movePair = moveTree[x];
                let newIndex = index + movePair[0] + movePair[1]*8
                let newColumn = newIndex % 8
                if (newIndex > 63 || newIndex < 0 || this.parent.column+movePair[0] !=newColumn){
                    break
                }
                let newSquare = boardSquares[newIndex]
                if (newSquare.piece){
                    if (newSquare.piece.pieceColor !== this.pieceColor){
                        boardSquares[newIndex].selected = true
                    }
                    break
                }
                else{
                    boardSquares[newIndex].selected = true
                }
            }
        }
        
    }
}
class Board{
    constructor(index){
        this.index = index
        this.row = this.setRow()
        this.column = this.setColumn()
        this.color = this.setColor()
        this.piece = this.setPiece()
        this.selected = false
    }
    setRow(){
        return Math.trunc(this.index/8)
    }
    setColumn(){
        return this.index % 8
    }
    setColor(){
        let even = !!((this.row+this.column) % 2)
        return even ? "black" : "white"
    }
    setPiece(){
        /// add ,1 here
        if ([0,1, 6, 7].includes(this.row)){
            let pieceColor = [0, 1].includes(this.row) ? "black" : "white"
            let pieceName = [6, 1].includes(this.row) ? "pawn" : pieceOrder[this.column]
            let piece = new Piece(pieceName, pieceColor, this)
            return piece
        }
        return null
    }
    movePiece(){
        //static
        console.log(SELETED)
        let prevIndex = SELETED.parent.index
        boardSquares[prevIndex].piece = null
        this.piece = SELETED
        this.piece.parent = this
        this.piece.hasMoved = true
        SELETED = ""
    }
}
function updateBoard(){
    for (elem of document.querySelectorAll(".highlight")) {
        elem.classList.remove("highlight");
    }
    for (elem of document.querySelectorAll(".c-highlight")) {
        elem.classList.remove("c-highlight");
    }
    let imageList = document.querySelectorAll("img");
    if (imageList){
        imageList.forEach(image => {
            image.remove()
        });
    }
    for (let i = 0; i < 64; i++) {
        let square = boardSquares[i];
        let boardSquareDiv = document.querySelector(`#square${i}`)
        let piece = square.piece
        if (piece){
            let pieceImage = document.createElement("img")
            pieceImage.src = `images/${piece.pieceName}_${piece.pieceColor}.svg`
            pieceImage.className = "piece-image"
            boardSquareDiv.appendChild(pieceImage)
        }
        if (square.selected){
            let color = (piece) ? "c-highlight" : "highlight"
            boardSquareDiv.classList.add(color)
        }
    }
}
function generateBoard(){
    let parent = document.querySelector(".board-container")
    for (let i = 0; i < 64; i++) {
        let boardSquare = new Board(i)
        let boardSquareDiv = document.createElement("div")
        boardSquareDiv.className = `board-square ${boardSquare.color}`
        boardSquareDiv.id = `square${i}`
        boardSquareDiv.addEventListener("click", function (){clickBoard(i)})
        parent.appendChild(boardSquareDiv)
        boardSquares.push(boardSquare)
    }
    updateBoard()
}

function clickBoard(index){
    let square = boardSquares[index]
    let skip = false
    if (square.selected){
        square.movePiece()
        skip = true
    }
    for (let i = 0; i < boardSquares.length; i++) {
        let element = boardSquares[i];
        element.selected = false
    }
    if (square.piece && !skip){
        square.piece.getMoves()
        
    }
    updateBoard()
    
}
window.addEventListener("DOMContentLoaded", function(){
    expandPieceMovement()
    generateBoard()
}, false)
