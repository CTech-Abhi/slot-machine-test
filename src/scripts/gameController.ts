import * as PIXI from "pixi.js";
import { reel } from "./reel";
import { Model } from "./model";

export class gameController extends PIXI.Container {
  private gameData: Model;
  private reelStartPosition_x = 70;
  private reelStartPosition_y = 30;
  private reels: reel[] = [];
  private symbolSize = 160;
  private winDisplay: PIXI.Text;

  constructor() {
    super();
    this.gameData = Model.getInstance();
    this.winDisplay = this.createWinText();
  }

  public init() {
    console.log("Initializing the game ...");
    this.initReels();
    this.createSpinButton();
  }

  private createSpinButton() {
    const mainButton = PIXI.Sprite.from("images/spin_button.png");
    mainButton.x = 200;
    mainButton.y = 500;
    mainButton.scale.set(0.6);
    mainButton.interactive = true;
    mainButton.cursor = "pointer";

    this.addChild(mainButton);
    mainButton.on("click", this.handleSpinRequest, this);
  }

  private createWinText() {
    const style = new PIXI.TextStyle({
      wordWrap: true,
      wordWrapWidth: 800,
    });
    const text = new PIXI.Text("GOOD LUCK !!", style);
    this.addChild(text);
    text.x = 550;
    text.y = 500;
    return text;
  }

  private handleSpinRequest() {
    let reels = this.gameData.reelsetData;
    const newReelStops: number[] = [];

    for (let i = 0; i < reels.length; i++) {
      newReelStops.push(Math.floor(Math.random() * reels[i].length));
    }
    this.gameData.reelstops = newReelStops;

    const newReelSymbols = this.gameData.stopSymbols;
    for (let reelIndex = 0; reelIndex < this.reels.length; reelIndex++) {
      this.reels[reelIndex].fillWithSymbols(newReelSymbols[reelIndex]);
    }

    this.showWinDetails();
  }

  private showWinDetails() {
    const winLines = this.gameData.winningLines;
    const totalWin = this.gameData.totalWinAmount;
    console.log("Winnings  ::::    ", winLines);
    let winData = totalWin
      ? "total Win : " + this.gameData.totalWinAmount
      : "GOOD LUCK !!";
    for (let i = 0; i < winLines.length; i++) {
      winData += "\n";
      winData +=
        " - " +
        "payline " +
        winLines[i].index +
        ", " +
        winLines[i].symbol +
        " x" +
        winLines[i].count +
        " ," +
        winLines[i].payout;
    }

    this.winDisplay.text = winData;
  }

  private initReels() {
    let initReels = this.gameData.stopSymbols;
    for (let i = 0; i < initReels.length; i++) {
      console.log("Init Reel stops :::      ", initReels[i]);
      let newReel = new reel();
      newReel.fillWithSymbols(initReels[i]);
      newReel.scale.set(0.6);
      this.addChild(newReel);

      newReel.x = this.reelStartPosition_x + i * this.symbolSize;
      newReel.y = this.reelStartPosition_y;
      this.reels.push(newReel);
    }
  }
}
