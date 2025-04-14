"use strict";
// Elements
const playersEl = document.querySelectorAll(".player");
const diceEl = document.querySelector(".dice");
const rollButtonEl = document.querySelector(".btn--roll");
const holdButtonEl = document.querySelector(".btn--hold");
const newGameButtonEl = document.querySelector(".btn--new");
//////////////////////////////////////////////////////////////////////////
let curPlayer,
  isPlaying,
  currentScore = 0,
  scores;
function init() {
  scores = [0, 0];
  isPlaying = true;
  curPlayer = 0;
  currentScore = 0;
  diceEl.classList.add("hidden");

  document.querySelector("#current--1").textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  document.querySelector("#score--0").textContent = 0;

  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
}

function switchPlayer() {
  currentScore = 0;
  document.querySelector(`#current--${curPlayer}`).innerHTML =
    Number(currentScore);

  curPlayer = curPlayer == 0 ? 1 : 0;
  playersEl.forEach((el) => el.classList.remove("player--active"));
  document
    .querySelector(`.player--${curPlayer}`)
    .classList.add("player--active");
}
///////////////////////////////////////////////////////////////////////////
// Events
rollButtonEl.addEventListener("click", (e) => {
  if (isPlaying) {
    const random = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `./assets/images/dice-${random}.png`;
    if (random === 1) {
      currentScore = 0;
      switchPlayer();
    } else if (random !== 1) {
      currentScore += random;
      console.log(currentScore);
    }

    document.querySelector(`#current--${curPlayer}`).innerHTML =
      Number(currentScore);
  } else {
    return;
  }
});

holdButtonEl.addEventListener("click", () => {
  if (isPlaying) {
    scores[curPlayer] += currentScore;
    document.querySelector(`#score--${curPlayer}`).textContent =
      scores[curPlayer];

    if (scores[curPlayer] >= 30) {
      document
        .querySelector(`.player--${curPlayer}`)
        .classList.add("player--winner");
      diceEl.classList.add("hidden");
      isPlaying = false;
    } else {
      switchPlayer();
    }
  }
});

newGameButtonEl.addEventListener("click", init);

window.addEventListener("DOMContentLoaded", init);
