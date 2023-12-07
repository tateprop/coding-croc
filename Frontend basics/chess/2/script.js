let boardSquares = []
let pieceOrder = ["rook", "bishop", "knight", "queen","king","knight","bishop","rook"]
let pieceMovement = {
    "pawn" :{"moves" : [[1,0]], "bi" : false, "one": true},
    "rook" : {"moves" : [[1,0]], "bi" : true, "one": false},
    "bishop" : {"moves" : [[1,1]], "bi" : true, "one": false},
    "knight" : {"moves" : [[2,1],[1,2]], "bi" : true, "one": true},
    "queen" : {"moves" : [[1,0],[1,1]], "bi" : true, "one": false},
    "king" : {"moves" : [[1,0],[1,1]], "bi" : true, "one": true},
}
class Piece{
    constructor(pieceName, pieceColor){
        this.pieceName = pieceName;
        this.pieceColor = pieceColor;
        this.hasMoved = false;
    }
}
class Board{
    constructor(index){
        this.index = index
        this.row = this.setRow()
        this.column = this.setColumn()
        this.color = this.setColor()
        this.piece = this.setPiece()
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
        if ([0, 1, 6, 7].includes(this.row)){
            let pieceColor = [0, 1].includes(this.row) ? "black" : "white"
            let pieceName = [6, 1].includes(this.row) ? "pawn" : pieceOrder[this.column]
            let piece = new Piece(pieceName, pieceColor)
            return piece
        }
        return null
    }
}
function updateBoard(){
    for (elem of document.getElementsByClassName("highlight")) {
        elem.classList.remove("highlight");
    }
    for (elem of document.getElementsByClassName("c-highlight")) {
        elem.classList.remove("c-highlight");
    }
    let imageList = document.querySelector("img");
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
    }
}
function generateBoard(){
    let parent = document.querySelector(".board-container")
    for (let i = 0; i < 64; i++) {
        let boardSquare = new Board(i)
        let boardSquareDiv = document.createElement("div")
        boardSquareDiv.className = `board-square ${boardSquare.color}`
        boardSquareDiv.id = `square${i}`
        parent.appendChild(boardSquareDiv)
        boardSquares.push(boardSquare)
    }
    updateBoard()
}
function getMoves(index){
    //assume piece check has been made
    let square = boardSquares[index]
    let piece = square.piece
    let pieceDict = pieceMovement[piece.pieceName]
    
}
window.addEventListener("DOMContentLoaded", function(){
    generateBoard()
}, false)
