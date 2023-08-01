const gameArea = document.getElementById("gameArea");
const player = "white";
const width = 8;
const board = [];
const divs = [];
let obj = {};
let positions = [];

const startGame = () => {
  let rowArr = [];
  let divRow = [];
  for (let i = 0; i < width; i++) {
    rowArr = [];
    divRow = [];
    let chessRow = document.createElement("div");
    chessRow.classList.add("chessRow");

    for (let j = 0; j < width; j++) {
      let chessBox = document.createElement("div");
      chessBox.classList.add("chessBox");
      chessBox.setAttribute("id", `${i}${j}`);

      if ((i + j) % 2 !== 0) {
        chessBox.style.backgroundColor = "#968E96";
      } else {
        chessBox.style.backgroundColor = "#EEEEEE";
      }
      let figure = document.createElement("div");

      if (i === 0) {
        figure.setAttribute("class", "figure");
        figure.innerText = pieces["black"][figures[1][j]];
        chessBox.appendChild(figure);
        rowArr.push({
          figure: pieces["black"][figures[1][j]],
          name: figures[1][j],
          color: "black",
          x: j,
          y: i,
        });
      } else if (i === 1) {
        figure.setAttribute("class", "figure");
        figure.innerText = pieces["black"][figures[0][j]];
        chessBox.appendChild(figure);
        rowArr.push({
          figure: pieces["black"][figures[0][j]],
          name: figures[0][j],
          color: "black",
          x: j,
          y: i,
        });
      } else if (i === 6) {
        figure.setAttribute("class", "figure");
        figure.innerText = pieces["white"][figures[0][j]];
        chessBox.appendChild(figure);
        rowArr.push({
          figure: pieces["white"][figures[0][j]],
          name: figures[0][j],
          color: "white",
          x: j,
          y: i,
        });
      } else if (i === 7) {
        figure.setAttribute("class", "figure");
        figure.innerText = pieces["white"][figures[1][j]];
        chessBox.appendChild(figure);
        rowArr.push({
          figure: pieces["white"][figures[1][j]],
          name: figures[1][j],
          color: "white",
          x: j,
          y: i,
        });
      } else {
        rowArr.push("");
      }

      if (j === 0) {
        let rowSpan = document.createElement("span");
        rowSpan.classList.add("rowSpan");
        rowSpan.innerText = 8 - i;
        chessBox.appendChild(rowSpan);
      }
      if (i === 7) {
        let columnSpan = document.createElement("span");
        columnSpan.classList.add("columnSpan");
        columnSpan.innerText = String.fromCharCode(97 + j);
        chessBox.appendChild(columnSpan);
      }
      chessBox.addEventListener("click", () => {
        positions = select(i, j);
      });
      divRow.push(chessBox);
      chessRow.appendChild(chessBox);
    }
    divs.push(divRow);
    board.push(rowArr);
    gameArea.appendChild(chessRow);
  }
};

const pawnMove = (obj, moves) => {
  for (let k = 0; k < moves.length; k++) {
    let thisDiv = divs[moves[k].y][moves[k].x];
    thisDiv.style.backgroundColor = "rgb(110, 110, 110)";
    thisDiv.onclick = () => {
      board[obj.x][obj.y] = "";
      board[moves[k].y][moves[k].x] = { ...obj, y: moves[k].y };

      let moveFigure = document.createElement("div");
      moveFigure.setAttribute("class", "figure");
      moveFigure.innerText = obj.figure;
      divs[moves[k].y][moves[k].x].appendChild(moveFigure);
      divs[obj.y][obj.x].innerHTML = "";
      console.log(board);
      divs.map((arr, a) => {
        arr.map((val, b) => {
          if ((a + b) % 2 === 0) {
            val.style.backgroundColor = "#EEEEEE";
          } else {
            val.style.backgroundColor = "#968E96";
          }
          return val;
        });
      });
      moves.map((val) => {
        document.getElementById(`${val.y}${val.x}`).onclick = null;
      });
    };
  }
};

const select = (i, j) => {
  obj = board[i][j];
  let moves = [];
  switch (obj.name) {
    case "pawn":
      if (player === "white") {
        if (obj.color === "white") {
          for (let i = 1; i <= 2; i++) {
            if (obj.y !== 6 && i === 2) continue;
            if (board[obj.y - i][obj.x] === "") {
              moves.push({ x: obj.x, y: obj.y - i });
            }
          }
          pawnMove(obj, moves);
        }
      }
      if (player === "black") {
        if (obj.color === "black") {
          if (obj.y === 1) {
            return [
              { x: obj.x, y: 2 },
              { x: obj.x, y: 3 },
            ];
          } else if (obj.y > 1 && obj.y < 7) {
            return [{ x: obj.x, y: obj.y + 1 }];
          }
        }
      }
      break;
  }
};

startGame();
