class Utils{
    static COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H"]
    constructor(){
        //this.COLUMNS = ["A", "B", "C", "D", "E", "F", "G", "H"]
    }
    static initialPieces(){
        return {
            "A1": new Pieces("A1", "rook", "white"),
            "B1": new Pieces("B1", "knight", "white"),
            "C1": new Pieces("C1", "bishop", "white"),
            "D1": new Pieces("D1", "queen", "white"),
            "E1": new Pieces("E1", "king", "white"),
            "F1": new Pieces("F1", "bishop", "white"),
            "G1": new Pieces("G1", "knight", "white"),
            "H1": new Pieces("H1", "rook", "white"),
            "A2": new Pieces("A2", "pawn", "white"),
            "B2": new Pieces("B2", "pawn", "white"),
            "C2": new Pieces("C2", "pawn", "white"),
            "D2": new Pieces("D2", "pawn", "white"),
            "E2": new Pieces("E2", "pawn", "white"),
            "F2": new Pieces("F2", "pawn", "white"),
            "G2": new Pieces("G2", "pawn", "white"),
            "H2": new Pieces("H2", "pawn", "white"),

            "A8": new Pieces("A8", "rook", "black"),
            "B8": new Pieces("B8", "knight", "black"),
            "C8": new Pieces("C8", "bishop", "black"),
            "D8": new Pieces("D8", "queen", "black"),
            "E8": new Pieces("E8", "king", "black"),
            "F8": new Pieces("F8", "bishop", "black"),
            "G8": new Pieces("G8", "knight", "black"),
            "H8": new Pieces("H8", "rook", "black"),
            "A7": new Pieces("A7", "pawn", "black"),
            "B7": new Pieces("B7", "pawn", "black"),
            "C7": new Pieces("C7", "pawn", "black"),
            "D7": new Pieces("D7", "pawn", "black"),
            "E7": new Pieces("E7", "pawn", "black"),
            "F7": new Pieces("F7", "pawn", "black"),
            "G7": new Pieces("G7", "pawn", "black"),
            "H7": new Pieces("H7", "pawn", "black"),

        }
    }
    static getIndexNum(position){
        let row = parseInt(position[1]) - 1
        let column = Utils.COLUMNS.indexOf(position[0])
        return row*8 + column
    }

    static initialBoard(pieces){
        let board = []
        for (let row = 8; row > 0; row--) {
            for (let index = 0; index < this.COLUMNS.length; index++) {
                let column = Utils.COLUMNS[index];
                ////////////////////
                let position = column + (9-row)
                let piece = (position in pieces) ? pieces[position] : undefined
                let details = {"position" : position, "piece" : piece}
                board.push(details)
            }
        }
        return board
    }
    static getColumnRow(index){
        return [index % 8, Math.trunc(index/8)]
    
    }
    static getIndexFromPosition(position){
        let index = this.COLUMNS.indexOf(position[0]) + (position[1]-1)*8
        return index
    }
    static indexToPositionBackwards(index){
        let [row, column] = Utils.getColumnRow(index)
        return this.COLUMNS[row] + (7-column + 1)
    }
    static indexToPosition(index){
        let [row, column] = Utils.getColumnRow(index)
        return this.COLUMNS[row] + (column + 1)
    }
    static addToPosition(position, column, row){
        let columnNow = this.COLUMNS.indexOf(position[0])
        let rowNow = parseInt(position[1]) - 1

        if (columnNow + column >= 0 && columnNow + column <= 7 && rowNow + row >= 0 && rowNow + row <= 7){
            return this.COLUMNS[columnNow + column] + (rowNow + row + 1)
        }
        return undefined
    }
    static addSelected(possibleMoves, possibleCaptures){
        Utils.removeSelected()
        possibleMoves.forEach((position) => document.querySelector(`#${position}`).classList.add("highlight"))
        possibleCaptures.forEach((position) => document.querySelector(`#${position}`).classList.add("c-highlight"))
    }
    static generateBoard(game){
        for (let i = 0; i < 64; i++) {
            let [row, column] = Utils.getColumnRow(i)
            let color = (column + row) % 2 ? "black" : "white"
            let squareDiv = document.createElement("div")
            squareDiv.className = `board-square ${color}`
            squareDiv.id = Utils.indexToPositionBackwards(i)
            squareDiv.addEventListener("click", function(){game.handleInput(Utils.getIndexFromPosition(squareDiv.id))}, false)
            document.querySelector(".board-container").appendChild(squareDiv)
        }
    }
    static deleteAllCLass(className){
        for (let elem of document.querySelectorAll(`.${className}`)) {
            elem.classList.remove(className);
        }
    }
    static removeSelected(){
        Utils.deleteAllCLass("highlight")
        Utils.deleteAllCLass("c-highlight")
    }
    static removeImgs(){
        let imageList = document.querySelectorAll("img");
        if (imageList){
            imageList.forEach(image => {
                image.remove()
            });
        }
    }
    static updateBoard(board){
        Utils.removeSelected()
        Utils.removeImgs()
        for (let i = 0; i < 64; i++) {
            let square = board[i]
            if (square.piece) {
                let parent = document.querySelector(`#${square.position}`)
                let img = document.createElement("img")
                img.src = `images/${square.piece.piece}_${square.piece.color}.svg`
                img.className = "piece-image"
                parent.appendChild(img)
            }
        }
    }
}
class Pieces{
    constructor(position, piece, color){
        this.position = position;
        this.piece = piece;
        this.color = color;
        this.index = Utils.getIndexNum(position)
        this.possibleMoves = []
        this.possibleCaptures = []
        let columnRow = Utils.getColumnRow(this.index)
        this.column = columnRow[0]
        this.row = columnRow[1]
        this.board = []
        this.hasMoved = false
    }
    movePiece(index){
        this.hasMoved = true
        this.index = index
        this.position = Utils.indexToPosition(index)
        let columnRow = Utils.getColumnRow(index)
        this.column = columnRow[0]
        this.row = columnRow[1]
        this.board = []
    }
    getMoveOptions(board){
        this.board = board
        this.possibleMoves = []
        this.possibleCaptures = []
        switch(this.piece) {
            case "rook":
                this.getRookMoves()
                break
            case "bishop":
                this.getBishopMoves()
                break
            case "queen":
                this.getQueenMoves()
                break
            case "knight":
                this.getKnightMoves()
                break
            case "king":
                this.getKingMoves()
                break
            case "pawn":
                this.getPawnMoves()
                break

        }
        Utils.addSelected(this.possibleMoves, this.possibleCaptures)
    }
    getPawnMoves(){
        let direction = (this.color=="white") ? 1 : -1
        this.checkMove(0, 1*direction)
        if (!this.hasMoved){this.checkMove(0, 2*direction)}
        this.possibleCaptures = []

        this.checkMove(1, 1*direction, true)
        this.checkMove(-1, 1*direction, true)
    }
    getKingMoves(){
        this.checkMove(1, 1);
        this.checkMove(1, -1);
        this.checkMove(-1, 1);
        this.checkMove(-1, -1);
        this.checkMove(0, 1);
        this.checkMove(0, -1);
        this.checkMove(1, 0);
        this.checkMove(-1, 0);
    }
    getKnightMoves(){
        this.checkMove(1, 2);
        this.checkMove(1, -2);
        this.checkMove(-1, 2);
        this.checkMove(-1, -2);
        this.checkMove(2, 1);
        this.checkMove(2, -1);
        this.checkMove(-2, 1);
        this.checkMove(-2, -1);
    }
    getQueenMoves(){
        this.getBishopMoves()
        this.getRookMoves()
        
    }
    getBishopMoves(){
        this.moveUntilEnd(1, 1)
        this.moveUntilEnd(-1, -1)
        this.moveUntilEnd(-1, 1)
        this.moveUntilEnd(1, -1)
    }
    getRookMoves(){
        this.moveUntilEnd(1, 0)
        this.moveUntilEnd(-1, 0)
        this.moveUntilEnd(0, 1)
        this.moveUntilEnd(0, -1)
    }
    moveUntilEnd(column, row){
        //this feels a bit icky im not sure :/
        let count = 1
        while (this.checkMove(column*count, row*count)) {
            count ++;
        }
    }
    checkMove(column, row, pawn = false){
        let newIndex = this.index + column + row*8
        let newPosition = Utils.indexToPosition(newIndex)
        if (newPosition == Utils.addToPosition(this.position, column, row)){
            if (!this.board[newIndex].piece){ 
                if (!pawn){
                    this.possibleMoves.push(newPosition)
                    return true
                }
                else{return false}
            }
            if (this.board[newIndex].piece.color != this.color){
                this.possibleCaptures.push(newPosition)
                return false
            }
            return false
        }
        return false
    }
}
class Game{
    constructor(initialPieces){
        this.board = Utils.initialBoard(initialPieces)
        this.turn = "white"
        this.previosClicked = ""
        
    }
    start(){
        Utils.generateBoard(this)
        Utils.updateBoard(this.board)
    }
    arrangeBoard(index){
        this.board[index].piece = this.previosClicked
        this.board[this.previosClicked.index].piece = undefined
        this.previosClicked.movePiece(index)
        Utils.updateBoard(this.board)
        this.changeTurn()
    }
    handleInput(index){
        let piece = this.board[index].piece
        let position = Utils.indexToPosition(index)
        if (piece){
            if (piece.color == this.turn){
                this.previosClicked = piece
                piece.getMoveOptions(this.board)
            }
            else if (this.previosClicked.possibleCaptures.includes(position)){
                this.arrangeBoard(index)
            }
        }
        else if (this.previosClicked.possibleMoves.includes(position)){
            this.arrangeBoard(index)
        }
        else{
            Utils.removeSelected()
        }
    }
    changeTurn(){
        this.turn = (this.turn == "black") ? "white" : "black"
    }
}
window.addEventListener("DOMContentLoaded", function (){
    game = new Game(Utils.initialPieces())
    game.start()
}, false)
