import "./styles/index.scss";

createElement("div", "container");

function createElement(elem, className, parentNode = "app") {
  const element = document.createElement(elem);
  element.classList.add(className);
  document.querySelector(`.${parentNode}`).appendChild(element);
  return element;
}

for (let i = 0; i < 100; i++) {
  const element = createElement("div", "cell", "container");
  element.classList.add(`cell-${i}`);
  element.setAttribute("data-info", i);
  element.addEventListener("click", (event) => {
    console.log(event.target);
  });
}
const minesPosition = [];

fillMines();

function fillMines() {
  for (let i = 0; i < 10; i++) {
    let randomNum = Math.floor(Math.random() * 100);
    minesPosition.push(randomNum);
    document.querySelectorAll(".cell")[randomNum].classList.add("mine");
  }
}
addCellNumbers();

function addCellNumbers() {
  console.log(minesPosition);
  for (let i = 0; i < 100; i++) {
    let mines = 0;
    const cell = document.querySelectorAll(".cell")[i];
    const cellNumber = +cell.dataset.info;
    if (minesPosition.includes(cellNumber)) continue;

    if (cellNumber === 0) {
      checkMinesAround(cell, cellNumber, [1, 10, 11]);
    } else if (cellNumber > 0 && cellNumber < 9) {
      checkMinesAround(cell, cellNumber, [-1, 1, 10, 11, 9]);
    } else if (cellNumber === 9) {
      checkMinesAround(cell, cellNumber, [-1, 10, 9]);
    } else if (cellNumber > 0 && cellNumber % 10 === 0) {
      checkMinesAround(cell, cellNumber, [-10, -9, 1, 10, 11]);
    } else if (cellNumber > 90 && cellNumber < 99) {
      checkMinesAround(cell, cellNumber, [-1, 1, -10, -11, -9]);
    } else if (cellNumber === 99) {
      checkMinesAround(cell, cellNumber, [-1, -10, -11]);
    } else if (
      cellNumber > 9 &&
      cellNumber < 99 &&
      (cellNumber - 9) % 10 === 0
    ) {
      checkMinesAround(cell, cellNumber, [-10, -11, -1, 10, 9]);
    } else {
      checkMinesAround(cell, cellNumber, [-10, -11, -9, -1, 1, 10, 9, 11]);
    }
  }
}

function checkMinesAround(cell, cellNumber, minesAround) {
  let localMines = 0;
  minesAround.forEach((mineAround) => {
    minesPosition.includes(cellNumber + mineAround) ? localMines++ : localMines;
  });
  setNumberMines(cell, localMines);
}
function setNumberMines(cell, localMines) {
  if (localMines > 0) cell.innerHTML = localMines;
}
