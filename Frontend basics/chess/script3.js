let pieceOrder = ["rook", "bishop", "knight", "queen","king","knight","bishop","rook"]
let pieceMovement = {"rook":[[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]],"bishop":[[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]],[[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]],[[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]],[[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]]],"knight":[[[2,1]],[[-2,-1]],[[2,-1]],[[-2,1]],[[1,2]],[[-1,-2]],[[1,-2]],[[-1,2]]],"queen":[[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]],[[-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0]],[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7]],[[-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7]],[[1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7]],[[-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]],[[0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]],[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]]],"king":[[[1,0]],[[-1,0]],[[1,0]],[[-1,0]],[[1,1]],[[-1,-1]],[[1,-1]],[[-1,1]],[[0,1]],[[0,-1]],[[0,-1]],[[0,1]]]}

class Game{
    constructor(){
        this.board = []
        this.turn = "white"
        this.selected = null
    }
    start() {
        this.generateBoard()

    }
    removeAllClass(className){
        for (let elem of document.querySelectorAll(`.${className}`)) {
            elem.classList.remove(className);
        }
    }
    handelInput(index, row, column){
        let currSquare = this.board[index]
        if (currSquare.piece.pieceColor == this.turn){
            let validMoves = this.getMoves(index, row, column, currSquare)
            this.updateBoard(validMoves)
        }
        else if (currSquare.selected){
            this.movePiece(index)
        }
    }
    getMoves(index, row, column, currSquare){
        let pieceName = currSquare.piece.pieceName
        let moves = pieceMovement[pieceName]
        let validMoves = []
        if (pieceName=="pawn"){
            let direction = currSquare.piece.pieceColor == "black" ? 1 : -1
            moves = currSquare.piece.hasMoved ? [[[direction, 0]]]: [[[direction, 0], [direction*2, 0]]]
        }
        for (let i=0; i < moves.length; i++){
            let moveSet = moves[i]
            for (let x=0; x < moveSet.length; x++){
                let currMove = moveSet[x]
                let currIndex = index + currMove[0] + currMove[1]*8
                let currRow = Math.trunc(currIndex/8)
                let currColumn = currIndex%8
                if (currIndex >= 0 && currIndex <= 63 && column+currMove[0] == currColumn && row+currMove[1] == currRow){
                    if (this.board[currIndex].piece.pieceName){
                        if (this.board[currIndex].piece.pieceColor == this.turn){
                            break
                        }
                        validMoves.push(currIndex)
                        break
                    }
                    validMoves.push(currIndex)
                }
                else{
                    break
                }

            }
        }
        return validMoves
    }
    updateBoard(validMoves = []){
        this.removeAllClass("c-highlight")
        this.removeAllClass("highlight")
        let imageList = document.querySelectorAll("img");
        if (imageList){
            imageList.forEach(image => {
                image.remove()
            });
        }
        for (let i = 0; i < 64; i++) {
            let square = this.board[i]
            if (square.piece.pieceName) {
                let parent = document.querySelector(`#elem${i}`)
                let img = document.createElement("img")
                img.src = `images/${square.piece.pieceName}_${square.piece.pieceColor}.svg`
                img.className = "piece-image"
                parent.appendChild(img)
            }
            if (validMoves.includes(i)){
                document.querySelector(`#elem${i}`).classList.add("highlight")
            }
        }
    }
    generateBoard(){
        for (let i = 0; i < 64; i++) {
            let row = Math.trunc(i/8)
            let column = i % 8
            let squareHash = {}
            squareHash["color"] = (i+row)%2 ? "black" : "white"
            squareHash["piece"] = this.setPieceData(row, column)
            let squareDiv = document.createElement("div")
            squareDiv.className = `board-square ${squareHash["color"]}`
            squareDiv.id = `elem${i}`
            squareDiv.addEventListener("click", function(){game.handelInput(i, row, column)}, false)
            document.querySelector(".board-container").appendChild(squareDiv)
            this.board.push(squareHash)
        }
        this.updateBoard()
    }
    setPieceData(row, column){
        if ([0,1,6,7].includes(row)){
            let pieceData = {"hasMoved": false}
            pieceData["pieceColor"] = [0,1].includes(row) ? "black" : "white"
            pieceData["pieceName"] = [1,6].includes(row) ? "pawn" : pieceOrder[column]
            return pieceData
        }
        else {
            return {"pieceName": null}
        }

    }
}
let game
document.addEventListener("DOMContentLoaded", function() {
    game = new Game()
    game.start()
}, false)
