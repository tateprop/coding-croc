

function addGrid(n){
    let gridParent = document.querySelector(".grid-container")
    let gridElems = document.querySelectorAll(".grid-elem")
    gridElems.forEach((elem) => elem.remove())
    for (let i = 0; i < n**2; i++) {
        let gridElem = document.createElement('div');
        gridElem.classList.add('grid-elem');
        gridElem.style.width = `${100/n}%`
        gridElem.style.height = `${100/n}%`
        gridElem.addEventListener('mouseover', () => gridElem.style.background="black")
        gridParent.appendChild(gridElem)
    }
}
function getValue(){
    let elem = document.querySelector("#gridInput");
    let gridSize = elem.value;
    elem.value = "";
    (+gridSize <= 100) ? addGrid(gridSize) : "";
}