const scorevalue = document.getElementById("score");
const rulesbtn = document.querySelector("#btn");
const overlay = document.querySelector(".rules__overlay");
const crossbtn = document.querySelector(".cross-btn");
const buttons = document.querySelectorAll(".button");
const resultcontainer = document.querySelector(".result");
const result = document.getElementById("result__title__status");
const resultbox = document.querySelector(".result__title");
const gamechoices = document.querySelector(".game_choices");
const player = document.getElementById("player");
const computer = document.getElementById("computer");
const playerimg = document.getElementById("playerimg");
const computerimg = document.getElementById("computerimg");
const invisible = document.querySelector(".invisible");
const resetbtn = document.querySelector(".play-again-btn");
const mediaQuery = window.matchMedia("(max-width: 552px)");
let userchoice, computerchoice;
let winner;
let score = 0;
const pointMap = new Map();
pointMap.set("paper", 0);
pointMap.set("scissors", 1);
pointMap.set("rock", 2);

rulesbtn.addEventListener("click", function () {
  // Close Hamburger Menu
  if (!overlay.classList.contains("open")) {
    overlay.style.zIndex = 1;
    overlay.classList.add("open");
  }
});
crossbtn.addEventListener("click", function () {
  if (overlay.classList.contains("open")) {
    overlay.classList.remove("open");
    setTimeout(() => {
      overlay.style.zIndex = -1;
    }, 500);
  }
});

function main() {
  let choices = ["rock", "paper", "scissors"];
  userchoice = undefined;
  computerchoice = undefined;
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      userchoice = button.id;
      choices.splice(choices.indexOf(userchoice), 1);
      computerchoice = choices[Math.floor(Math.random() * 2)];
      choices = ["rock", "paper", "scissors"];
      GetWinner();
      updateresult(userchoice, computerchoice);
    });
  });
}

function updateScore(n) {
  score += n;
  scorevalue.innerHTML = score;
}

function GetWinner() {
  if (userchoice === "paper" && computerchoice === "rock") {
    result.innerText = "you win";
    winner = userchoice;

    setTimeout(() => {
      updateScore(1);
    }, 3000);
  } else if (userchoice === "rock" && computerchoice === "paper") {
    result.innerText = "you lose";
    winner = computerchoice;

    setTimeout(() => {
      updateScore(-1);
    }, 3000);
  } else if (pointMap.get(userchoice) > pointMap.get(computerchoice)) {
    result.innerText = "you win";
    winner = userchoice;

    setTimeout(() => {
      updateScore(1);
    }, 3000);
  } else {
    result.innerText = "you lose";
    winner = computerchoice;
    setTimeout(() => {
      updateScore(-1);
    }, 3000);
  }
}

function updateresult(userchoice, computerchoice) {
  gamechoices.classList.add("active");
  resultcontainer.classList.add("active");
  player.classList.add(userchoice);
  computer.classList.add(computerchoice);
  playerimg.src = `/images/icon-${userchoice}.svg`;
  computerimg.src = `images/icon-${computerchoice}.svg`;
  setTimeout(load, 3500);
  setTimeout(showcomputerchoice, 2000);
  if (mediaQuery.matches) {
    setTimeout(() => {
      rulesbtn.classList.add("active");
    }, 3400);
  }
}

function load() {
  resultcontainer.classList.add("load");
  resultbox.classList.add("active");
}

function showcomputerchoice() {
  invisible.classList.add("active");
}

resetbtn.addEventListener("click", function () {
  gamechoices.classList.remove("active");
  resultcontainer.classList.remove("active");
  player.classList.remove(userchoice);
  computer.classList.remove(computerchoice);
  resultcontainer.classList.remove("load");
  resultbox.classList.remove("active");
  invisible.classList.remove("active");
  rulesbtn.classList.remove("active");
});

main();
