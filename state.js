export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d");

export const global = {
  theme: new Audio("./theme.mp3"),
  cards: [],
  playerCount: 0,
  dealerCount: 0,
  playerHand: [],
  dealerHand: [],
  inventory: [],
  bettingInventory: [],
  mouseX: null,
  mouseY: null,
  inventoryCash: 2500,
  bettingCash: 0,
  chipCount: 1,
  cardCount: 1,
  inPlay: false,
  placeBets: false,
  dealCards: false,
  dealerHits: true,
  mouseDown: false,
  mouseUp: false,
  outcome: null,
  outcomeSound: true,
  revealSound: true,
};
