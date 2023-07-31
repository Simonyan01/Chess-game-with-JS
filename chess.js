const gameArea = document.getElementById("gameArea");
const width = 8;
let board = [];

const figures = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];

for (let i = 0; i < width; i++) {
  // let checkin = [];
  let chessRow = document.createElement("div");
  chessRow.classList.add("chessRow");
  for (let j = 0; j < width; j++) {
    // checkin.push({
    //   figure: "",
    //   figureColor: "",
    // });

    let chessBox = document.createElement("div");
    chessBox.classList.add("chessBox");

    figures.forEach((start, i) => {
      chessBox.innerHTML = start;
      chessBox.setAttribute("id", i);
    });
    if ((i + j) % 2 !== 0) {
      chessBox.style.backgroundColor = "black";
    } else {
      chessBox.style.backgroundColor = "white";
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
    chessRow.appendChild(chessBox);
  }
  gameArea.appendChild(chessRow);
}
