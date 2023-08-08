const gameArea = document.getElementById("gameArea");
let player = "white";
let positions = [];
let board = [];
let divs = [];
let obj = {};

function startGame() {
  let rowArr = [];
  let divRow = [];
  for (let i = 0; i < 8; i++) {
    rowArr = [];
    divRow = [];
    let chessRow = document.createElement("div");
    chessRow.classList.add("chessRow");

    for (let j = 0; j < 8; j++) {
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
}

function pawnMove(obj, moves) {
  for (let k = 0; k < moves.length; k++) {
    let moveDiv = divs[moves[k].y][moves[k].x];

    moves[k].status === "move"
      ? (moveDiv.style.backgroundColor = "rgb(110, 110, 110)")
      : (moveDiv.style.backgroundColor = "red");

    moveDiv.onclick = () => {
      board[obj.x][obj.y] = "";
      board[moves[k].y][moves[k].x] = { ...obj, y: moves[k].y, x: moves[k].x };
      divs[moves[k].y][moves[k].x].innerHTML = "";

      let moveFigure = document.createElement("div");
      moveFigure.classList.add("figure");
      moveFigure.innerText = obj.figure;
      divs[moves[k].y][moves[k].x].appendChild(moveFigure);
      divs[obj.y][obj.x].innerHTML = "";
      console.log(board);

      clearBoard();

      player === "black" ? (player = "white") : (player = "black");

      moves.map((val) => {
        document.getElementById(`${val.y}${val.x}`).onclick = null;
      });
    };
  }
}

function clearBoard() {
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
}

function knightMoves(obj) {
  let moves = [];
  for (let i = -2; i <= 2; i += 4) {
    for (let j = -1; j <= 1; j += 2) {
      if (
        obj.y + i >= 0 &&
        obj.y + i <= 7 &&
        obj.x + j >= 0 &&
        obj.x + j <= 7
      ) {
        if (board[obj.y + i][obj.x + j] === "")
          moves.push({ x: obj.x + j, y: obj.y + i, status: "move" });
        else if (board[obj.y + i][obj.x + j].color !== player)
          moves.push({ x: obj.x + j, y: obj.y + i, status: "eat" });
      }
      if (
        obj.y + j >= 0 &&
        obj.y + j <= 7 &&
        obj.x + i >= 0 &&
        obj.x + i <= 7
      ) {
        if (board[obj.y + j][obj.x + i] === "")
          moves.push({ x: obj.x + i, y: obj.y + j, status: "move" });
        else if (board[obj.y + j][obj.x + i].color !== player)
          moves.push({ x: obj.x + i, y: obj.y + j, status: "eat" });
      }
    }
  }
  return moves;
}

function rookMoves(obj) {
  let moves = [];
  let i = 1;

  while (obj.y + i <= 7) {
    if (board[obj.y + i][obj.x] === "") {
      moves.push({ x: obj.x, y: obj.y + i, status: "move" });
    } else {
      if (board[obj.y + i][obj.x].color !== player) {
        moves.push({ x: obj.x, y: obj.y + i, status: "eat" });
      }
      break;
    }
    i++;
  }
  i = 1;

  while (obj.y - i >= 0) {
    if (board[obj.y - i][obj.x] === "") {
      moves.push({ x: obj.x, y: obj.y - i, status: "move" });
    } else {
      if (board[obj.y - i][obj.x].color !== player) {
        moves.push({ x: obj.x, y: obj.y - i, status: "eat" });
      }
      break;
    }
    i++;
  }
  i = 1;

  while (obj.x + i <= 7) {
    if (board[obj.y][obj.x + i] === "") {
      moves.push({ x: obj.x + i, y: obj.y, status: "move" });
    } else {
      if (board[obj.y][obj.x + i].color !== player) {
        moves.push({ x: obj.x + i, y: obj.y, status: "eat" });
      }
      break;
    }
    i++;
  }
  i = 1;

  while (obj.x - i >= 0) {
    if (board[obj.y][obj.x - i] === "") {
      moves.push({ x: obj.x - i, y: obj.y, status: "move" });
    } else {
      if (board[obj.y][obj.x - i].color !== player) {
        moves.push({ x: obj.x - i, y: obj.y, status: "eat" });
      }
      break;
    }
    i++;
  }

  return moves;
}

function bishopMoves(obj) {
  let moves = [];
  let i = 1;

  while (obj.y + i <= 7 && obj.x + i <= 7) {
    if (board[obj.y + i][obj.x + i] === "") {
      moves.push({ x: obj.x + i, y: obj.y + i, status: "move" });
    } else {
      if (board[obj.y + i][obj.x + i].color !== player) {
        moves.push({ x: obj.x + i, y: obj.y + i, status: "eat" });
      }
      break;
    }
    i++;
  }
  i = 1;

  while (obj.y - i >= 0 && obj.x - i >= 0) {
    if (board[obj.y - i][obj.x - i] === "") {
      moves.push({ x: obj.x - i, y: obj.y - i, status: "move" });
    } else {
      if (board[obj.y - i][obj.x - i].color !== player) {
        moves.push({ x: obj.x - i, y: obj.y - i, status: "eat" });
      }
      break;
    }
    i++;
  }
  i = 1;

  while (obj.x + i <= 7 && obj.y - i >= 0) {
    if (board[obj.y - i][obj.x + i] === "") {
      moves.push({ x: obj.x + i, y: obj.y - i, status: "move" });
    } else {
      if (board[obj.y - i][obj.x + i].color !== player) {
        moves.push({ x: obj.x + i, y: obj.y - i, status: "eat" });
      }
      break;
    }
    i++;
  }
  i = 1;

  while (obj.x - i >= 0 && obj.y + i <= 7) {
    if (board[obj.y + i][obj.x - i] === "") {
      moves.push({ x: obj.x - i, y: obj.y + i, status: "move" });
    } else {
      if (board[obj.y + i][obj.x - i].color !== player) {
        moves.push({ x: obj.x - i, y: obj.y + i, status: "eat" });
      }
      break;
    }
    i++;
  }

  return moves;
}

function queenMoves(obj) {
  let moves = [];
  let rook = rookMoves(obj);
  let bishop = bishopMoves(obj);
  moves = moves.concat(rook, bishop);
  return moves;
}

function kingMoves(obj) {
  let moves = [];

  for (let i = -1; i <= 1; i += 2) {
    for (let j = -1; j <= 1; j++) {
      if (
        obj.y + i >= 0 &&
        obj.y + i <= 7 &&
        obj.x + j >= 0 &&
        obj.x + j <= 7
      ) {
        if (board[obj.y + i][obj.x + j] === "")
          moves.push({ x: obj.x + j, y: obj.y + i, status: "move" });
        else if (board[obj.y + i][obj.x + j].color !== player)
          moves.push({ x: obj.x + j, y: obj.y + i, status: "eat" });
      }
      if (
        obj.y + j >= 0 &&
        obj.y + j <= 7 &&
        obj.x + i >= 0 &&
        obj.x + i <= 7
      ) {
        if (board[obj.y + j][obj.x + i] === "")
          moves.push({ x: obj.x + i, y: obj.y + j, status: "move" });
        else if (board[obj.y + j][obj.x + i].color !== player)
          moves.push({ x: obj.x + i, y: obj.y + j, status: "eat" });
      }
    }
  }

  return moves;
}

function select(i, j) {
  clearBoard();
  obj = board[i][j];
  let moves = [];
  switch (obj.name) {
    case "pawn":
      if (player === "white") {
        if (obj.color === "white") {
          for (let i = 1; i <= 2; i++) {
            if (obj.y !== 6 && i === 2) continue;
            if (
              board[obj.y - i][obj.x] === "" &&
              board[obj.y - 1][obj.x] === ""
            ) {
              moves.push({ x: obj.x, y: obj.y - i, status: "move" });
            }
            if (i === 1) {
              if (obj.x - 1 >= 0 && obj.y - i >= 0) {
                if (
                  board[obj.y - i][obj.x - 1].color !== player &&
                  board[obj.y - i][obj.x - 1] !== ""
                ) {
                  moves.push({ x: obj.x - 1, y: obj.y - i, status: "eat" });
                }
              }
              if (obj.x + 1 <= 7 && obj.y - i >= 0) {
                if (
                  board[obj.y - i][obj.x + 1].color !== player &&
                  board[obj.y - i][obj.x + 1] !== ""
                ) {
                  moves.push({ x: obj.x + 1, y: obj.y - i, status: "eat" });
                }
              }
            }
          }
          pawnMove(obj, moves);
        }
      }
      if (player === "black") {
        if (obj.color === "black") {
          for (let i = 1; i <= 2; i++) {
            if (obj.y !== 1 && i === 2) continue;
            if (
              board[obj.y + i][obj.x] === "" &&
              board[obj.y + 1][obj.x] === ""
            ) {
              moves.push({ x: obj.x, y: obj.y + i, status: "move" });
            }
            if (i === 1) {
              if (obj.x - 1 >= 0 && obj.y + i <= 7) {
                if (
                  board[obj.y + i][obj.x - 1].color !== player &&
                  board[obj.y + i][obj.x - 1] !== ""
                ) {
                  moves.push({ x: obj.x - 1, y: obj.y + i, status: "eat" });
                }
              }
              if (obj.x + 1 <= 7 && obj.y + i <= 7) {
                if (
                  board[obj.y + i][obj.x + 1].color !== player &&
                  board[obj.y + i][obj.x + 1] !== ""
                ) {
                  moves.push({ x: obj.x + 1, y: obj.y + i, status: "eat" });
                }
              }
            }
          }
          move(obj, moves);
        }
      }
      break;
    case "knight":
      if (player === obj.color) {
        moves = knightMoves(obj);
        move(obj, moves);
      }
      break;

    case "rook":
      if (player === obj.color) {
        moves = rookMoves(obj);
        move(obj, moves);
      }
      break;

    case "bishop":
      if (player === obj.color) {
        moves = bishopMoves(obj);
        move(obj, moves);
      }
      break;

    case "queen":
      if (player === obj.color) {
        moves = queenMoves(obj);
        move(obj, moves);
      }
      break;

    case "king":
      if (player === obj.color) {
        moves = kingMoves(obj);
        move(obj, moves);
      }
      break;
  }
}

startGame();
