import * as state from "./state.js";
import * as classes from "./classes.js";
import * as creation from "./creation.js";

export function handleMouseDown() {
  state.global.mouseDown = true;
  state.global.mouseUp = false;
}

export function handleMouseUp() {
  state.global.mouseUp = true;
  state.global.mouseDown = false;
}

export function handleGameStart() {
  state.global.theme.play();
  state.global.theme.currentTime = 0.5;
  state.global.theme.volume = 0.005;
  state.global.theme.loop = true;
  const audio = new Audio();
  audio.src = "./audio/placebets.mp3";
  audio.volume = 0.04;
  audio.play();
  state.global.inPlay = true;
  state.global.placeBets = true;
  const startGameButton = document.querySelector(".start-game-button");
  startGameButton.setAttribute("disabled", true);
}

export function changeCursorToPointer() {
  const mouseOverBettingInvetoryChips = state.global.bettingInventory.filter(
    (chip) => chip.mouseHover
  ).length;
  const mouseOverInventoryChips = state.global.inventory.filter(
    (chip) => chip.mouseHover
  ).length;
  if (mouseOverInventoryChips) state.canvas.style.cursor = "pointer";
  else if (mouseOverBettingInvetoryChips) state.canvas.style.cursor = "pointer";
  else state.canvas.style.cursor = "default";
}

export function drawDealButton() {
  const exists = document.querySelector(".deal-button");
  if (
    state.global.bettingInventory.length &&
    !exists &&
    state.global.placeBets
  ) {
    const dealButton = document.createElement("button");
    dealButton.innerText = "Deal";
    dealButton.classList.add("deal-button");
    dealButton.classList.add("button-hoverclass");
    const canvasContainer = document.querySelector(".canvas-container");
    canvasContainer.append(dealButton);
    dealButton.addEventListener("click", handleDealButtonClick);
  } else if (exists && !state.global.bettingInventory.length) {
    const dealButton = document.querySelector(".deal-button");
    dealButton.setAttribute("disabled", true);
    dealButton.style.animationName = "fadeOut";
    dealButton.style.animationTimingFunction = "ease-in";
    dealButton.style.fillMode = "both";
    dealButton.style.duration = "300ms";
    setTimeout(() => {
      dealButton.remove();
    }, 300);
  }
}

export function handleDealButtonClick() {
  const audio = new Audio();
  audio.src = "./audio/click.mp3";
  audio.volume = 0.02;
  audio.play();
  const dealButton = document.querySelector(".deal-button");
  dealButton.removeEventListener("click", handleDealButtonClick);
  dealButton.style.animationName = "fadeOut";
  dealButton.style.animationTimingFunction = "ease-in";
  dealButton.style.fillMode = "both";
  dealButton.style.duration = "300ms";
  setTimeout(() => {
    dealButton.remove();
  }, 300);
  state.global.dealCardsStart = true;
  state.global.placeBets = false;
}

export function updateInventoryCash() {
  const cashContainer = document.querySelector(".cash-container");
  cashContainer.innerHTML = `Cash: $${state.global.inventoryCash}`;
}

export function updateBettingCash() {
  const bettingCashContainer = document.querySelector(
    ".betting-cash-container"
  );
  bettingCashContainer.innerHTML = `Bet: $${state.global.bettingCash}`;
}

export function handleMouseMove(e) {
  const root = document.documentElement;
  const rect = state.canvas.getBoundingClientRect();
  let x = e.clientX - root.scrollLeft - rect.left;
  let y = e.clientY - root.scrollTop - rect.top;
  state.global.mouseX = x;
  state.global.mouseY = y;
}

export function findIndexOfChip(id, arr) {
  for (let i = 0; i < arr.length; i++) {
    let curr = arr[i];
    if (curr.id === id) {
      return i;
    }
  }
}

export function dealCards() {
  if (state.global.dealCardsStart) {
    state.global.dealCardsStart = false;
    state.global.dealCards = true;
    // give player their initial cards
    for (let j = 0; j < 2; j++) {
      const playerCard = grabRandomCard();
      state.global.playerHand.push(playerCard);
    }
    // give dealer their initial cards
    for (let i = 0; i < 2; i++) {
      const dealerCard = grabRandomCard();
      state.global.dealerHand.push(dealerCard);
    }
  }
}

export function grabCard(index) {
  const card = state.global.cards[index];
  state.global.cards.splice(index, 1);
  return card;
}

export function grabRandomCard() {
  const randomNum = Math.floor(Math.random() * state.global.cards.length);
  const card = state.global.cards[randomNum];
  state.global.cards.splice(randomNum, 1);
  return card;
}

export function setCardDestination() {
  const playerHand = state.global.playerHand;
  const dealerHand = state.global.dealerHand;
  let yOffset = 130;
  let xSpacingBetweenCards = 10;
  let ySpacingBetweenCards = 25;
  let playerCardDealerCardGap = 50;
  let playerX, playerY, dealerX, dealerY;

  // set player cards destination
  for (let i = 0; i < playerHand.length; i++) {
    if (i === 0) {
      playerX = state.canvas.width / 2 - 138 - playerCardDealerCardGap;
      playerY = state.canvas.height / 2 - yOffset;
    }
    if (i === 1) {
      playerX =
        state.canvas.width / 2 -
        276 -
        playerCardDealerCardGap -
        xSpacingBetweenCards;
      playerY = state.canvas.height / 2 - yOffset;
    }
    if (i === 2) {
      playerX =
        state.canvas.width / 2 -
        276 -
        playerCardDealerCardGap -
        xSpacingBetweenCards;
      playerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards;
    }
    if (i === 3) {
      playerX = state.canvas.width / 2 - 138 - playerCardDealerCardGap;
      playerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards;
    }
    if (i === 4) {
      playerX =
        state.canvas.width / 2 -
        276 -
        playerCardDealerCardGap -
        xSpacingBetweenCards;
      playerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 2;
    }
    if (i === 5) {
      playerX = state.canvas.width / 2 - 138 - playerCardDealerCardGap;
      playerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 2;
    }
    if (i === 6) {
      playerX =
        state.canvas.width / 2 -
        276 -
        playerCardDealerCardGap -
        xSpacingBetweenCards;
      playerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 3;
    }

    if (i === 7) {
      playerX = state.canvas.width / 2 - 138 - playerCardDealerCardGap;
      playerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 3;
    }
    playerHand[i].destinationX = playerX;
    playerHand[i].destinationY = playerY;
  }
  // set dealer cards destination
  for (let i = 0; i < dealerHand.length; i++) {
    if (i === 0) {
      dealerX = state.canvas.width / 2 + 188 + xSpacingBetweenCards;
      dealerY = state.canvas.height / 2 - yOffset;
    }
    if (i === 1) {
      dealerX = state.canvas.width / 2 + playerCardDealerCardGap;
      dealerY = state.canvas.height / 2 - yOffset;
    }
    if (i === 2) {
      dealerX = state.canvas.width / 2 + playerCardDealerCardGap;
      dealerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards;
    }
    if (i === 3) {
      dealerX = state.canvas.width / 2 + 188 + xSpacingBetweenCards;
      dealerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards;
    }
    if (i === 4) {
      dealerX = state.canvas.width / 2 + playerCardDealerCardGap;
      dealerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 2;
    }
    if (i === 5) {
      dealerX = state.canvas.width / 2 + 188 + xSpacingBetweenCards;
      dealerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 2;
    }
    if (i === 6) {
      dealerX = state.canvas.width / 2 + playerCardDealerCardGap;
      dealerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 3;
    }
    if (i === 7) {
      dealerX = state.canvas.width / 2 + 188 + xSpacingBetweenCards;
      dealerY = state.canvas.height / 2 - yOffset + ySpacingBetweenCards * 3;
    }
    dealerHand[i].destinationX = dealerX;
    dealerHand[i].destinationY = dealerY;
  }
}

export function updateCounts() {
  updatePlayerCount();
  updateDealerCount();
}

function updatePlayerCount() {
  const playerHand = state.global.playerHand;
  const dealt = playerCardsDealt();
  let count = 0;
  if (dealt && playerHand.length) {
    for (let i = 0; i < playerHand.length; i++) {
      let curr = playerHand[i];
      count += curr.value;
    }
    state.global.playerCount = count;
    const playerContainer = document.querySelector(".player-container");
    playerContainer.innerText = `Player: ${state.global.playerCount}`;
  }
}

function updateDealerCount() {
  const dealerHand = state.global.dealerHand.filter((card) => !card.hidden);
  const dealt = dealerCardsDealt();
  if (dealt && dealerHand.length) {
    let count = 0;
    for (let i = 0; i < dealerHand.length; i++) {
      let curr = dealerHand[i];
      count += curr.value;
    }
    state.global.dealerCount = count;
    const dealerContainer = document.querySelector(".dealer-container");
    dealerContainer.innerText = `Dealer: ${state.global.dealerCount}`;
  }
}

export function dealCardsAnimation() {
  const dealCards = state.global.dealCards;
  const dealt = allCardsDealt();
  if (dealCards && !dealt) {
    let index = state.global.playerHand.length - 1;
    let card = state.global.playerHand[index];
    card.moving = true;

    if (card.x === card.destinationX && card.y === card.destinationY) {
      card = state.global.playerHand[index - 1];
      card.moving = true;
    }

    const playerCardsFinshed = state.global.playerHand.every((card) => {
      return card.x === card.destinationX && card.y === card.destinationY;
    });

    if (playerCardsFinshed) {
      index = state.global.dealerHand.length - 1;
      card = state.global.dealerHand[index];
      card.moving = true;

      if (card.x === card.destinationX && card.y === card.destinationY) {
        card = state.global.dealerHand[index - 1];
        card.moving = true;
      }
    }
  }
}

export function drawOptionsContainer() {
  const exists = document.querySelector(".options-container");
  if (state.global.dealCards && !exists) {
    const optionsContainer = document.createElement("div");
    optionsContainer.classList.add("options-container");
    const canvasContainer = document.querySelector(".canvas-container");
    canvasContainer.append(optionsContainer);
    const hitButton = document.createElement("button");
    optionsContainer.appendChild(hitButton);
    hitButton.classList.add("hit-button");
    hitButton.innerText = "Hit";
    optionsContainer.appendChild(hitButton);
    const standButton = document.createElement("button");
    standButton.classList.add("stand-button");
    standButton.innerText = "Stand";
    optionsContainer.appendChild(standButton);
    hitButton.addEventListener("click", handleHitButtonClick);
    hitButton.classList.add("button-hoverclass");
    standButton.addEventListener("click", handleStandButtonClick);
    standButton.classList.add("button-hoverclass");
  }
}
export function handleHitButtonClick() {
  state.global.isHitting = true;
  const audio = new Audio();
  audio.src = "./audio/click.mp3";
  audio.volume = 0.02;
  audio.play();
  playerHits();
}

export function toggleButtons() {
  const hitting = state.global.isHitting;
  const visible = playerCardsVisible();
  const dealt = dealerCardsDealt();
  const stand = state.global.stand;
  const outcome = state.global.outcome;
  if (!hitting && visible && dealt && !stand && !outcome) {
    enableButtons();
  } else {
    disableButtons();
  }
}

function dealerCardsVisible() {
  const visible = state.global.dealerHand.every(
    (card) => card.hidden === false
  );
  if (visible) return true;
}

function playerCardsVisible() {
  const visible = state.global.playerHand.every(
    (card) => card.hidden === false
  );
  if (visible) return true;
}

function allCardsVisible() {
  const playerHand = state.global.playerHand;
  const dealerHand = state.global.dealerHand;
  const player = playerHand.every((card) => !card.hidden);
  const dealer = dealerHand.every((card) => !card.hidden);
  if (dealerHand.length && player && dealer) return true;
}

function dealerCardsDealt() {
  const dealerCardsDealt = state.global.dealerHand.every(
    (i) => i.x === i.destinationX && i.y === i.destinationY
  );
  if (dealerCardsDealt) return true;
}

function playerCardsDealt() {
  const playerCardsDealt = state.global.playerHand.every(
    (card) => card.x === card.destinationX && card.y === card.destinationY
  );
  if (playerCardsDealt) return true;
}

function allCardsDealt() {
  const player = playerCardsDealt();
  const dealer = dealerCardsDealt();
  if (player && dealer) return true;
}

function handleStandButtonClick() {
  state.global.stand = true;
  revealDealerCards();
  const audio = new Audio();
  audio.src = "./audio/click.mp3";
  audio.volume = 0.02;
  audio.play();
}

export function determineIfDealerHits() {
  const visible = allCardsVisible();
  const outcome = state.global.outcome;
  let playerCount = state.global.playerCount;
  let dealerCount = state.global.dealerCount;
  if (
    dealerCount < playerCount &&
    visible &&
    outcome === null &&
    dealerCount < 21 &&
    dealerCount !== playerCount
  ) {
    dealerHits();
  } else if (
    visible &&
    outcome === null &&
    dealerCount !== playerCount &&
    dealerCount < 21 &&
    dealerCount > playerCount
  ) {
    state.global.outcome = "dealer";
  }
}

function dealerHits() {
  const visible = allCardsVisible();
  const dealerHits = state.global.dealerHits;
  const dealt = allCardsDealt();
  if (dealerHits && visible && dealt) {
    state.global.dealerHits = false;
    const card = grabRandomCard();
    const dealerHand = state.global.dealerHand;
    const playerCount = state.global.playerCount;
    let dealerCount = state.global.dealerCount + card.value;
    const aces = dealerHand.filter((card) => card.value === 11);

    if (aces) {
      dealerCount = state.global.dealerCount;
    }

    setTimeout(() => {
      dealerHand.push(card);
      if (dealerCount < 21 && dealerCount < playerCount)
        state.global.dealerHits = true;
    }, 1000);
  }
}

export function playerHits() {
  const card = grabRandomCard();
  const playerHand = state.global.playerHand;
  playerHand.push(card);
  setTimeout(() => {
    state.global.isHitting = false;
  }, 1500);
}

function revealDealerCards() {
  const revealSound = state.global.revealSound;
  if (revealSound) {
    state.global.revealSound = false;
    setTimeout(() => {
      const audio = new Audio();
      audio.src = "./audio/whoosh.mp3";
      audio.volume = 0.1;
      audio.play();
    }, 1000);
  }
  setTimeout(() => {
    const dealerHand = state.global.dealerHand;
    dealerHand.forEach((card) => (card.hidden = false));
  }, 1000);
}

export function checkForCashRemaining() {
  const cash = state.global.inventoryCash;
  const bettingCash = state.global.bettingCash;
  const dealCards = state.global.dealCards;
  if (cash === 0 && bettingCash === 0 && !dealCards) {
    gameOver();
  }
}

function gameOver() {
  let inPlay = state.global.inPlay;
  if (inPlay) {
    state.global.theme.pause();
    const audio = new Audio();
    audio.src = "./audio/broke.m4a";
    audio.volume = 0.03;
    audio.play();
    const modalBackground = document.createElement("div");
    modalBackground.classList.add("modal-background");
    const canvasContainer = document.querySelector(".canvas-container");
    canvasContainer.appendChild(modalBackground);
    state.global.inPlay = false;
    state.global.placeBets = false;
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("game-over-container");
    canvasContainer.appendChild(gameOverContainer);
    const outOfFundsTitle = document.createElement("span");
    outOfFundsTitle.classList.add("out-of-funds-title");
    outOfFundsTitle.innerText = "Out of Funds!";
    const replayButton = document.createElement("button");
    replayButton.classList.add("replay-button");
    replayButton.classList.add("button-hoverclass");
    replayButton.innerText = "Replay";
    gameOverContainer.appendChild(outOfFundsTitle);
    gameOverContainer.appendChild(replayButton);
    replayButton.addEventListener("click", handleReplayButtonClick);
  }
}

function handleReplayButtonClick() {
  const audio = new Audio();
  audio.src = "./audio/placebets.mp3";
  audio.volume = 0.02;
  audio.play();
  const modalBackground = document.querySelector(".modal-background");
  const replayButton = document.querySelector(".replay-button");
  replayButton.removeEventListener("click", handleReplayButtonClick);
  const gameOverContainer = document.querySelector(".game-over-container");
  gameOverContainer.remove();
  modalBackground.remove();
  state.global.cards = [];
  state.global.playerCount = 0;
  state.global.dealerCount = 0;
  state.global.playerHand = [];
  state.global.dealerHand = [];
  state.global.inventory = [];
  state.global.bettingInventory = [];
  state.global.mouseX = null;
  state.global.mouseY = null;
  state.global.inventoryCash = 2500;
  state.global.bettingCash = 0;
  state.global.chipCount = 1;
  state.global.cardCount = 1;
  state.global.inPlay = true;
  state.global.placeBets = true;
  state.global.dealCards = false;
  state.global.dealerHits = true;
  state.global.mouseDown = false;
  state.global.mouseUp = false;
  state.global.outcome = null;
  state.global.outcomeSound = true;
  state.global.revealSound = true;
  state.global.theme.currentTime = 0.5;
  state.global.theme.play();
  state.global.theme.loop = true;
  state.global.stand = false;
  state.global.isHitting = false;
  creation.createCards();
  creation.createChips();
}

export function checkForPlayerGoingOver() {
  const dealCards = state.global.dealCards;
  const playerHand = state.global.playerHand;
  const outcome = state.global.outcome;

  let playerHiddenCount = 0;

  // find hidden player count
  for (let i = 0; i < playerHand.length; i++) {
    let curr = playerHand[i];
    playerHiddenCount += curr.value;
  }
  const aces = playerHand.filter((card) => card.value === 11);

  // set value of ace to 1
  if (aces.length && playerHiddenCount > 21) {
    aces[0].value = 1;
  }

  const visible = playerHand.every((card) => card.hidden === false);
  if (visible && dealCards) {
    const playerCount = state.global.playerCount;
    if (playerCount > 21 && outcome === null) {
      disableButtons();
      setTimeout(() => {
        state.global.outcome = "dealer";
      }, 1000);
      revealDealerCards();
    }
  }
}

export function checkForDealerGoingOver() {
  const dealCards = state.global.dealCards;
  const visible = allCardsVisible();
  const outcome = state.global.outcome;
  const dealerHand = state.global.dealerHand;

  let dealerHiddenCount = 0;

  // find hidden dealer count
  for (let i = 0; i < dealerHand.length; i++) {
    let curr = dealerHand[i];
    dealerHiddenCount += curr.value;
  }
  const aces = dealerHand.filter((card) => card.value === 11);
  // set value of ace to 1
  if (aces.length && dealerHiddenCount > 21) {
    aces[0].value = 1;
  }

  if (visible && dealCards && outcome === null) {
    if (state.global.dealerCount > 21 && state.global.outcome === null) {
      revealDealerCards();
      state.global.outcome = "player";
    }
  }
}

export function checkForPush() {
  const dealt = allCardsDealt();
  const visible = allCardsVisible();
  const outcome = state.global.outcome;
  const dealerHand = state.global.dealerHand;
  let playerCount = state.global.playerCount;
  let dealerCount = 0;
  for (let i = 0; i < dealerHand.length; i++) {
    let curr = dealerHand[i];
    dealerCount += curr.value;
  }
  if (dealt && visible && playerCount === dealerCount && outcome === null) {
    disableButtons();
    state.global.outcome = "push";
  }
}

export function checkForBlackJack() {
  const playerCount = state.global.playerCount;
  const dealerCount = state.global.dealerCount;
  const outcome = state.global.outcome;
  if (playerCount === 21 && outcome === null) {
    state.global.outcome = "blackjack-player";
  } else if (dealerCount === 21 && outcome === null) {
    state.global.outcome = "blackjack-dealer";
  }
}

export function createModal(str) {
  setTimeout(() => {
    const dealerCardsDealt = state.global.dealerHand.every((card) => {
      return card.x === card.destinationX && card.y === card.destinationY;
    });
    const exists = document.querySelector(".modal-background");
    if (!exists && state.global.dealCards && dealerCardsDealt) {
      const modalBackground = document.createElement("div");
      modalBackground.classList.add("modal-background");
      const canvasContainer = document.querySelector(".canvas-container");
      canvasContainer.appendChild(modalBackground);
      const modalText = document.createElement("span");
      modalText.classList.add("modal-text");
      modalText.innerText = str;
      canvasContainer.appendChild(modalText);
      modalBackground.addEventListener("click", handleModalClick);
      modalText.addEventListener("click", handleModalClick);
    }
  }, 1000);
}

export function handleModalClick() {
  if (state.global.bettingCash !== 0 && state.global.inventoryCash !== 0) {
    const audio = new Audio();
    audio.src = "./audio/placebets.mp3";
    audio.volume = 0.02;
    audio.play();
  }
  handleOutcomes();
  state.global.stand = false;
  state.global.isHitting = false;
  state.global.outcomeSound = true;
  state.global.revealSound = true;
  state.global.dealerHits = true;
  state.global.dealingFinished = false;
  state.global.placeBets = true;
  state.global.bettingInventory = [];
  removeModal();
  resetCards();
  resetCounts();
}

function handleOutcomes() {
  const outcome = state.global.outcome;
  if (outcome === "player") handlePlayerWins();
  if (outcome === "blackjack-player") handlePlayerWins();
  if (outcome === "dealer") handlePlayerLoss();
  if (outcome === "blackjack-dealer") handlePlayerLoss();
  if (outcome === "push") handlePush();
  state.global.outcome = null;
}

function repositionInventoryChips() {
  let y = state.canvas.height - 135;
  for (let i = 0; i < state.global.inventory.length; i++) {
    let chipToMove = state.global.inventory[i];
    if (chipToMove.value === 1) {
      chipToMove.x = state.canvas.width / 2 - 195;
      chipToMove.y = y;
    } else if (chipToMove.value === 10) {
      chipToMove.x = state.canvas.width / 2 - 65;
      chipToMove.y = y;
    } else if (chipToMove.value === 100) {
      chipToMove.x = state.canvas.width / 2 + 65;
      chipToMove.y = y;
    } else if (chipToMove.value === 500) {
      chipToMove.x = state.canvas.width / 2 + 195;
      chipToMove.y = y;
    }
  }
}

function handlePush() {
  const bettingInventory = state.global.bettingInventory;
  let bettingAmt = 0;
  for (let i = 0; i < bettingInventory.length; i++) {
    let curr = bettingInventory[i];
    bettingAmt += curr.value;
  }
  let inventory = state.global.inventory;
  while (bettingInventory.length) {
    const chip = bettingInventory.pop();
    inventory.push(chip);
  }
  state.global.bettingCash = 0;
  state.global.inventoryCash += bettingAmt;
  inventory = inventory.sort((a, b) => {
    return a.value - b.value;
  });
  console.log(inventory);
  repositionInventoryChips();
}

function removeModal() {
  const modalBackground = document.querySelector(".modal-background");
  const modalText = document.querySelector(".modal-text");
  modalBackground.removeEventListener("click", handleModalClick);
  modalText.removeEventListener("click", handleModalClick);
  modalText.remove();
  modalBackground.remove();
  const optionsContainer = document.querySelector(".options-container");
  optionsContainer.remove();
}

function resetCounts() {
  state.global.playerCount = 0;
  state.global.dealerCount = 0;
  const playerContainer = document.querySelector(".player-container");
  playerContainer.innerText = `Player: ${state.global.playerCount}`;
  const dealerContainer = document.querySelector(".dealer-container");
  dealerContainer.innerText = `Dealer: ${state.global.dealerCount}`;
}

function recalibrateChips() {
  state.global.inventory = [];
  let chipsValueToMake = state.global.inventoryCash;
  let inventory = state.global.inventory;

  while (chipsValueToMake >= 2000) {
    const chip = new classes.Chip(500, 1000, 1000, state.global.chipCount);
    inventory.push(chip);
    state.global.chipCount++;
    chipsValueToMake -= 500;
  }

  while (chipsValueToMake >= 400) {
    const chip = new classes.Chip(100, 1000, 1000, state.global.chipCount);
    inventory.push(chip);
    state.global.chipCount++;
    chipsValueToMake -= 100;
  }

  while (chipsValueToMake >= 30) {
    const chip = new classes.Chip(10, 1000, 1000, state.global.chipCount);
    inventory.push(chip);
    state.global.chipCount++;
    chipsValueToMake -= 10;
  }

  while (chipsValueToMake >= 1) {
    const chip = new classes.Chip(1, 1000, 1000, state.global.chipCount);
    inventory.push(chip);
    state.global.chipCount++;
    chipsValueToMake -= 1;
  }
  inventory = inventory.sort((a, b) => {
    return a.value - b.value;
  });

  let sum = 0;
  for (let i = 0; i < inventory.length; i++) {
    sum += inventory[i].value;
  }
}

function addBettingChipsAmountToCash() {
  state.global.bettingCash = 0;
  let amt = 0;
  const bettingInventory = state.global.bettingInventory;
  for (let i = 0; i < bettingInventory.length; i++) {
    let curr = bettingInventory[i];
    amt += curr.value;
  }
  state.global.inventoryCash += amt * 2;
  state.global.bettingInventory = [];
}

function handlePlayerLoss() {
  state.global.bettingCash = 0;
  state.global.bettingInventory = [];
}

function handlePlayerWins() {
  addBettingChipsAmountToCash();
  recalibrateChips();
  repositionInventoryChips();
}

function resetCards() {
  state.global.cardCount = 1;
  state.global.dealCards = false;
  state.global.playerHand = [];
  state.global.dealerHand = [];
  state.global.cards = [];
  creation.createCards();

  // reset x and y positions of all cards and moving property
  for (let i = 0; i < state.global.cards.length; i++) {
    let curr = state.global.cards[i];
    curr.x = 700;
    curr.y = -200;
    curr.destinationX = null;
    curr.destinationY = null;
    curr.moving = false;
    curr.hidden = true;
    curr.opacity = 0;
    curr.opacityVelocity = 0.01;
  }
}

function playOutcomeSound(src, volume) {
  const outcomeSound = state.global.outcomeSound;
  if (outcomeSound) {
    state.global.outcomeSound = false;
    setTimeout(() => {
      const audio = new Audio();
      audio.src = src;
      audio.volume = volume;
      audio.play();
    }, 1000);
  }
}

export function createModalByOutcome() {
  const outcome = state.global.outcome;
  if (outcome) disableButtons();
  if (outcome === "player") {
    playOutcomeSound("./audio/youwin.mp3", 0.1);
    createModal("Player Wins!");
  }
  if (outcome === "dealer") {
    playOutcomeSound("./audio/lose.mp3", 0.05);
    createModal("Dealer Wins!");
  }
  if (outcome === "push") {
    createModal("Push!");
    const dealt = dealerCardsDealt();
    if (dealt) {
      playOutcomeSound("./audio/push.wav", 0.5);
    }
  }
  if (outcome === "blackjack-player") {
    createModal("Blackjack!");
    const dealt = playerCardsDealt();
    const playerHand = state.global.playerHand;

    if (dealt && playerHand.length) {
      playOutcomeSound("./audio/blackjack.mp3", 0.3);
    }
  }
  if (outcome === "blackjack-dealer") {
    createModal("Blackjack!");
    const dealt = dealerCardsDealt();
    const dealerHand = state.global.dealerHand;
    if (dealt && dealerHand.length) {
      playOutcomeSound("./audio/blackjack.mp3", 0.3);
    }
  }
}

function disableButtons() {
  const hitButton = document.querySelector(".hit-button");
  const standButton = document.querySelector(".stand-button");
  if (hitButton && standButton) {
    hitButton.setAttribute("disabled", true);
    hitButton.classList.remove("button-hoverclass");
    standButton.setAttribute("disabled", true);
    standButton.classList.remove("button-hoverclass");
  }
}

function enableButtons() {
  const hitButton = document.querySelector(".hit-button");
  const standButton = document.querySelector(".stand-button");
  if (hitButton && standButton) {
    hitButton.removeAttribute("disabled");
    hitButton.classList.add("button-hoverclass");
    standButton.removeAttribute("disabled");
    standButton.classList.add("button-hoverclass");
  }
}
