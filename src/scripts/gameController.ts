import * as PIXI from "pixi.js";
import { reel } from "./reel";
import { Model } from "./model";

export class gameController extends PIXI.Container {
  private gameData: Model;
  private reelStartPosition_x = 70;
  private reelStartPosition_y = 30;
  private reels: reel[] = [];
  private symbolSize = 160;
  constructor() {
    super();
    this.gameData = Model.getInstance();
  }

  public init() {
    console.log("Initializing the game ...");
    this.initReels();

    const mainButton = PIXI.Sprite.from("images/spin_button.png");
    mainButton.x = 200;
    mainButton.y = 500;
    mainButton.scale.set(0.6);
    this.addChild(mainButton);
    mainButton.interactive = true;
    mainButton.cursor = "pointer";

    mainButton.on("click", this.handleSpinRequest, this);
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
