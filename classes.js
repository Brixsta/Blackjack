import * as state from "./state.js";
import * as utility from "./utility.js";

export class Chip {
  constructor(value, x, y, id) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.mouseHover = false;
    this.color = null;
    this.betChip = false;
    this.id = id;
    this.alphaVelocity = 0.04;
    this.alpha = 0;
  }

  draw() {
    if (state.global.placeBets) {
      if (this.value === 500) this.color = `rgba(255, 0, 0,1)`;
      if (this.value === 100) this.color = `rgba(0, 0, 255,1)`;
      if (this.value === 10) this.color = `rgba(0,100,0,1)`;
      if (this.value === 1) this.color = `rgba(0,0,0,1)`;

      state.ctx.globalAlpha = this.alpha;

      if (this.alpha < 1) this.alpha += this.alphaVelocity;

      state.ctx.fillStyle = this.color;

      state.ctx.beginPath();
      state.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      state.ctx.fill();

      state.ctx.strokeStyle = this.color;
      state.ctx.lineWidth = 12;
      state.ctx.beginPath();
      state.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      state.ctx.stroke();

      state.ctx.strokeStyle = `rgba(255,255,255,1)`;
      state.ctx.lineWidth = 5;
      state.ctx.beginPath();
      state.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      state.ctx.stroke();

      state.ctx.shadowColor = `rgba(0,0,0,.6)`;
      state.ctx.shadowBlur = 5;

      state.ctx.lineWidth = 5;
      state.ctx.strokeStyle = `rgba(0,0,0,.4)`;
      state.ctx.strokeText(`${this.value}`, this.x, this.y + 5);

      state.ctx.textAlign = "center";
      state.ctx.textBaseline = "middle";
      state.ctx.fillStyle = `rgba(255,255,255,1)`;
      state.ctx.font = `${this.radius * 0.7}px Noto Serif Lao`;
      state.ctx.fillText(this.value, this.x, this.y + 5);
    }
  }

  detectMouseHover() {
    if (state.global.placeBets) {
      let dx, dy, distance;

      if (this.x > state.global.mouseX) {
        dx = this.x - state.global.mouseX;
      } else {
        dx = state.global.mouseX - this.x;
      }

      if (this.y > state.global.mouseY) {
        dy = this.y - state.global.mouseY;
      } else {
        dy = state.global.mouseY - this.y;
      }

      distance = Math.sqrt(dx * dx + dy * dy);

      const sumOfRadii = this.radius + 5;

      if (distance <= sumOfRadii) {
        this.mouseHover = true;
      } else {
        this.mouseHover = false;
      }
    }
  }

  moveChipToBettingArea() {
    if (this.mouseHover && state.global.mouseDown && state.global.placeBets) {
      const chipSound = new Audio();
      chipSound.src = "./chip.mp3";
      chipSound.play();
      chipSound.volume = 0.01;
      state.global.mouseDown = false;
      let randomX = Math.floor(Math.random() * (20 - -20) + -20);
      let randomY = Math.floor(Math.random() * (20 - -20) + -20);
      if (state.global.bettingInventory.length) {
        this.x = state.canvas.width / 2 + randomX;
      } else {
        this.x = state.canvas.width / 2;
      }
      this.y = 180 + randomY;
      const inventory = state.global.inventory;
      const chipIndex = utility.findIndexOfChip(
        this.id,
        state.global.inventory
      );
      const bettingInventory = state.global.bettingInventory;
      bettingInventory.push(inventory[chipIndex]);
      state.global.bettingCash += inventory[chipIndex].value;
      state.global.inventoryCash -= inventory[chipIndex].value;
      inventory.splice(chipIndex, 1);
    }
  }

  moveChipToInventory() {
    if (state.global.mouseDown && this.mouseHover) {
      const chipSound = new Audio();
      chipSound.src = "./chip.mp3";
      chipSound.play();
      chipSound.volume = 0.01;
      state.global.mouseDown = false;
      let y = state.canvas.height - 135;
      state.global.mouseDown = false;
      const chipToMove = state.global.bettingInventory.pop();
      state.global.inventoryCash += chipToMove.value;
      state.global.bettingCash -= chipToMove.value;
      state.global.inventory.push(chipToMove);
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
}

export class Card {
  constructor(name, value, suit, id) {
    this.name = name;
    this.value = value;
    this.suit = suit;
    this.width = 138;
    this.height = 200;
    this.face = new Image();
    this.face.src = `./images/cards/${this.name}_of_${this.suit}.png`;
    this.x = 700;
    this.y = -200;
    this.destinationX = null;
    this.destinationY = null;
    this.hidden = true;
    this.moving = false;
    this.opacity = 0;
    this.opacityVelocity = 0.01;
    this.id = id;
    this.dealSound = true;
  }

  draw() {
    if (!this.hidden && state.global.dealCards) {
      state.ctx.save();
      if (this.opacity < 1) {
        this.opacity += this.opacityVelocity;
        this.opacityVelocity += 0.0007;
      }
      state.ctx.globalAlpha = this.opacity;
      state.ctx.fillStyle = "white";
      state.ctx.drawImage(this.face, this.x, this.y, this.width, this.height);
      state.ctx.restore();
    } else if (this.hidden && state.global.dealCards) {
      state.ctx.shadowBlur = 0;
      state.ctx.fillStyle = "red";
      state.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  move() {
    if (this.moving) {
      if (this.dealSound) {
        this.dealSound = false;
        const dealSound = new Audio("");
        dealSound.src = "./deal.mp3";
        dealSound.play();
        dealSound.volume = 0.1;
      }

      if (this.x > this.destinationX) {
        this.x -= 15;
      } else {
        this.x = this.destinationX;
      }

      if (this.y < this.destinationY) {
        this.y += 15;
      } else {
        this.y = this.destinationY;
      }

      if (this.x === this.destinationX && this.y === this.destinationY) {
        this.moving = false;
      }
    }
  }

  revealCard() {
    const id = state.global.dealerHand[0].id;
    if (
      this.x === this.destinationX &&
      this.y === this.destinationY &&
      this.id !== id
    ) {
      this.hidden = false;
    }
  }
}

export class PlaceBetsTitle {
  constructor() {
    this.x = state.canvas.width / 2;
    this.y = 0;
    this.opacity = 0;
    this.opacityVelocity = 0.01;
  }

  draw() {
    state.ctx.save();
    if (state.global.placeBets) {
      state.ctx.globalAlpha = 1;
      if (this.opacity < 1) {
        this.opacity += this.opacityVelocity;
        this.opacityVelocity += 0.001;
      }
      state.ctx.font = "60px Noto Serif Lao";
      state.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      state.ctx.strokeStyle = `rgba(0,0,0,${this.opacity})`;
      state.ctx.lineWidth = 5;
      state.ctx.strokeText("Place Your Bets", this.x, this.y);
      state.ctx.fillText("Place Your Bets", this.x, this.y);
    } else if (state.global.dealCards) {
      if (this.opacity >= 0) {
        this.opacity -= this.opacityVelocity;
        this.opacityVelocity += 0.001;
      }
      state.ctx.font = "60px Noto Serif Lao";
      state.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      state.ctx.strokeStyle = `rgba(0,0,0,${this.opacity})`;
      state.ctx.lineWidth = 5;
      state.ctx.strokeText("Place Your Bets", this.x, this.y);
      state.ctx.fillText("Place Your Bets", this.x, this.y);
    }
    state.ctx.restore();
  }

  move() {
    if (state.global.placeBets) {
      if (this.y < 60) {
        this.y += 4;
      } else {
        this.y = 60;
      }
    } else if (state.global.dealCards) {
      if (this.y > 0) {
        this.y -= 1;
      } else {
        this.y = 0;
        this.opacity = 0;
        this.opacityVelocity = 0.01;
      }
    }
  }
}

export class DealCardsTitle {
  constructor() {
    this.x = state.canvas.width / 2;
    this.y = 0;
    this.opacity = 0;
    this.opacityVelocity = 0.01;
  }

  draw() {
    state.ctx.save();
    if (state.global.dealCards) {
      state.ctx.globalAlpha = 1;
      if (this.opacity < 1) {
        this.opacity += this.opacityVelocity;
        this.opacityVelocity += 0.001;
      }
      state.ctx.font = "60px Noto Serif Lao";
      state.ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
      state.ctx.strokeStyle = `rgba(0,0,0,${this.opacity})`;
      state.ctx.lineWidth = 5;
      state.ctx.strokeText("Dealing..", this.x, this.y);
      state.ctx.fillText("Dealing..", this.x, this.y);
    }
    state.ctx.restore();
  }

  move() {
    if (state.global.dealCards) {
      if (this.y < 60) {
        this.y += 4;
      } else {
        this.y = 60;
      }
    }
  }
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
