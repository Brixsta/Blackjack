import * as utility from "./utility.js";
import * as state from "./state.js";
import * as classes from "./classes.js";
export const startGameButton = document.querySelector(".start-game-button");
window.addEventListener("mouseup", utility.handleMouseUp);
window.addEventListener("mousedown", utility.handleMouseDown);
window.addEventListener("mousemove", utility.handleMouseMove);
startGameButton.addEventListener("click", utility.handleGameStart);

export function createCards() {
  for (let j = 0; j < 4; j++) {
    let suit;
    if (j === 0) suit = "hearts";
    if (j === 1) suit = "clubs";
    if (j === 2) suit = "diamonds";
    if (j === 3) suit = "spades";
    for (let i = 1; i <= 13; i++) {
      switch (i) {
        case 1:
          state.global.cards.push(
            new classes.Card("ace", 11, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 2:
          state.global.cards.push(
            new classes.Card("2", 2, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 3:
          state.global.cards.push(
            new classes.Card("3", 3, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 4:
          state.global.cards.push(
            new classes.Card("4", 4, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 5:
          state.global.cards.push(
            new classes.Card("5", 5, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 6:
          state.global.cards.push(
            new classes.Card("6", 6, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 7:
          state.global.cards.push(
            new classes.Card("7", 7, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 8:
          state.global.cards.push(
            new classes.Card("8", 8, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 9:
          state.global.cards.push(
            new classes.Card("9", 9, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 10:
          state.global.cards.push(
            new classes.Card("10", 10, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 11:
          state.global.cards.push(
            new classes.Card("jack", 10, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 12:
          state.global.cards.push(
            new classes.Card("queen", 10, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
        case 13:
          state.global.cards.push(
            new classes.Card("king", 10, suit, state.global.cardCount)
          );
          state.global.cardCount++;
          break;
      }
    }
  }
}

export function createChips() {
  let y = state.canvas.height - 135;
  for (let i = 0; i < 10; i++) {
    state.global.inventory.push(
      new classes.Chip(
        1,
        state.canvas.width / 2 - 195,
        y,
        state.global.chipCount
      ) // $1 chips
    );
    state.global.chipCount++;
  }
  for (let i = 0; i < 9; i++) {
    state.global.inventory.push(
      new classes.Chip(
        10,
        state.canvas.width / 2 - 65,
        y,
        state.global.chipCount
      ) // $10 chips
    );
    state.global.chipCount++;
  }
  for (let i = 0; i < 4; i++) {
    state.global.inventory.push(
      new classes.Chip(
        100,
        state.canvas.width / 2 + 65,
        y,
        state.global.chipCount
      ) // $100 chips
    );
    state.global.chipCount++;
  }
  for (let i = 0; i < 4; i++) {
    state.global.inventory.push(
      new classes.Chip(
        500,
        state.canvas.width / 2 + 195,
        y,
        state.global.chipCount
      ) // $500 chips
    );
    state.global.chipCount++;
  }
}

export function drawBackground() {
  state.ctx.fillStyle = "green";
  state.ctx.globalAlpha = 1;
  state.ctx.fillRect(0, 0, state.canvas.width, state.canvas.height);
}

export function drawConsole() {
  const exists = document.querySelector(".console");
  if (exists) return;
  const console = document.createElement("div");
  console.classList.add("console");
  const canvasContainer = document.querySelector(".canvas-container");
  canvasContainer.appendChild(console);
  drawCashContainer();
  drawBettingCashContainer();
  drawPlayerContainer();
  drawDealerContainer();
}

export function drawCashContainer() {
  const exists = document.querySelector(".cash-container");
  if (exists) return;
  const cashContainer = document.createElement("div");
  cashContainer.classList.add("cash-container");
  const console = document.querySelector(".console");
  console.appendChild(cashContainer);
  cashContainer.innerHTML = `Cash: $${state.global.inventoryCash}`;
}

export function drawBettingCashContainer() {
  const exists = document.querySelector(".betting-cash-container");
  if (exists) return;
  const bettingCashContainer = document.createElement("div");
  bettingCashContainer.classList.add("betting-cash-container");
  const console = document.querySelector(".console");
  console.appendChild(bettingCashContainer);
  bettingCashContainer.innerHTML = `Bet: $${state.global.bettingCash}`;
}

export function drawPlayerContainer() {
  const exists = document.querySelector(".player-container");
  if (exists) return;
  const playerContainer = document.createElement("div");
  playerContainer.classList.add("player-container");
  const console = document.querySelector(".console");
  console.appendChild(playerContainer);
  playerContainer.innerHTML = `Player: ${state.global.playerCount}`;
}

export function drawDealerContainer() {
  const exists = document.querySelector(".dealer-container");
  if (exists) return;
  const dealerContainer = document.createElement("div");
  dealerContainer.classList.add("dealer-container");
  const console = document.querySelector(".console");
  console.appendChild(dealerContainer);
  dealerContainer.innerHTML = `Dealer: ${state.global.dealerCount}`;
}
