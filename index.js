import { DealCardsTitle, PlaceBetsTitle } from "./classes.js";
import * as state from "./state.js";
import * as utility from "./utility.js";
import * as creation from "./creation.js";

const placeBetsTitle = new PlaceBetsTitle();
const dealCardsTitle = new DealCardsTitle();

function animate() {
  utility.createModalByOutcome();
  state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
  utility.checkForCashRemaining();
  utility.checkForBlackJack();
  utility.checkForPlayerGoingOver();
  utility.checkForDealerGoingOver();
  utility.checkForPush();
  creation.drawBackground();
  state.global.inventory.forEach((i) => {
    i.draw();
    i.detectMouseHover();
    i.moveChipToBettingArea();
  });
  state.global.bettingInventory.forEach((i) => {
    i.draw();
    i.detectMouseHover();
    i.moveChipToInventory();
  });
  utility.changeCursorToPointer();
  utility.drawDealButton();
  utility.dealCards();
  state.global.playerHand.forEach((i) => {
    i.draw();
    i.move();
    i.revealCard();
  });
  state.global.dealerHand.forEach((i) => {
    i.draw();
    i.move();
    i.revealCard();
  });
  creation.drawConsole();
  utility.updateInventoryCash();
  utility.updateBettingCash();
  placeBetsTitle.draw();
  placeBetsTitle.move();
  dealCardsTitle.draw();
  dealCardsTitle.move();
  utility.updateCounts();
  utility.setCardDestination();
  utility.dealCardsAnimation();
  utility.drawOptionsContainer();
  utility.determineIfDealerHits();
  window.requestAnimationFrame(animate);
}

window.onload = () => {
  creation.createCards();
  creation.createChips();
  animate();
};
