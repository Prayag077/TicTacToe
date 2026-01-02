let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetButton");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnText = document.querySelector("#turn-indicator");
let scoreO = document.querySelector("#score-o");
let scoreX = document.querySelector("#score-x");
let themeBtn = document.querySelector("#theme-toggle");

let turnO = true;
let moves = 0;
let oCount = 0;
let xCount = 0;

const tapSound = new Audio(
  "https://www.myinstants.com/media/sounds/clicksoundeffect.mp3"
);
const winSound = new Audio(
  "https://www.myinstants.com/media/sounds/anime-wow-sound-effect.mp3"
);

const winPattern = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    tapSound.currentTime = 0;
    tapSound.play();

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    moves++;
    turnText.innerText = `Turn: ${turnO ? "O" : "X"}`;
    checkWinner();
  });
});

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner, pattern) => {
  disableBoxes();
  pattern.forEach(i => boxes[i].classList.add("win"));

  msg.innerText = `🎉 Winner is ${winner}`;
  msgContainer.classList.remove("hide");

  if (winner === "O") {
    oCount++;
    scoreO.innerText = oCount;
  } else {
    xCount++;
    scoreX.innerText = xCount;
  }

  winSound.play();
  confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let [a,b,c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      showWinner(boxes[a].innerText, pattern);
      return;
    }
  }

  if (moves === 9) {
    msg.innerText = "🤝 It's a Draw";
    msgContainer.classList.remove("hide");
  }
};

const resetGame = () => {
  turnO = true;
  moves = 0;
  turnText.innerText = "Turn: O";

  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("win");
  });

  msgContainer.classList.add("hide");
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.innerText = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
