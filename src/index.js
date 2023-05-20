import "./styles/index.scss";
import { createElement } from "./util";

const appField = createElement("div", "app-field");

createElement("div", "modal", "app");
createElement("div", "overlay", "modal");
createElement("div", "modal-window", "modal");
createElement("p", "modal-window__text", "modal-window");
document.querySelector(".modal-window__text").innerHTML = "GAME OVER";

for (let i = 0; i < 100; i++) {
  const cell = createElement("div", "cell", "app-field");
  createElement("span", "cell__cont", "", cell);
  const cellMine = createElement("span", "cell__mine", "", cell);
  cellMine.innerHTML = "m";
  const cellQeust = createElement("span", "cell__quest", "", cell);
  cellQeust.innerHTML = "?";
  cell.classList.add(`cell-${i}`);
  cell.setAttribute("data-info", i);
}

appField.addEventListener("click", (event) => {
  // console.log(event.target);
  if (!event.target.classList.contains("cell")) return;
  if (event.target.querySelector(".cell__cont").classList.contains("mine")) {
    // document.querySelector(".modal").style.display = "flex";
    console.log("Mine. Game over");
  }
  event.target.querySelector(".cell__cont").classList.add("cell__cont-act");
});

const minesPosition = [];

fillMines();

function fillMines() {
  for (let i = 0; i < 10; i++) {
    let randomNum = Math.floor(Math.random() * 100);
    minesPosition.push(randomNum);
    document.querySelectorAll(".cell__cont")[randomNum].classList.add("mine");
  }
}

addCellNumMinesAround();

function addCellNumMinesAround() {
  for (let i = 0; i < 100; i++) {
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

function checkMinesAround(cell, cellNumber, cellsCheckMines) {
  let localMines = 0;
  cellsCheckMines.forEach((cellCheckMines) => {
    minesPosition.includes(cellNumber + cellCheckMines)
      ? localMines++
      : localMines;
  });
  setNumberMines(cell, localMines);
}
function setNumberMines(cell, localMines) {
  if (localMines > 0) {
    cell.querySelector(".cell__cont").innerHTML = localMines;
  }
}

document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
  console.log(event.target,'target');

  if (event.target.classList.contains("cell")) {
    event.target.querySelector(".cell__mine").classList.add("cell__mine-act");
  }
  if (event.target.classList.contains("cell__mine-act")) {
    event.target.classList.remove("cell__mine-act");
    event.target.parentNode
      .querySelector(".cell__quest")
      .classList.add("cell__quest-act");
  }
  if(event.target.classList.contains("cell__quest-act")){
    event.target.classList.remove("cell__quest-act")
  }
});
