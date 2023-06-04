import * as PIXI from "pixi.js";
import { TextStyle } from "pixi.js";

export class assetloader extends PIXI.Container {
  private loader: PIXI.Loader = PIXI.Loader.shared;
  private gameContainer: PIXI.Container;
  private loadingProgressText: PIXI.Text;
  private loaderPromise: any;

  constructor() {
    super();
    this.gameContainer = new PIXI.Container();
    this.loadingProgressText = new PIXI.Text(
      "",
      new TextStyle({
        fontFamily: ["Helvetica", "Arial", "sans-serif"],
        fontSize: 36,
        fill: 0xffffff,
      })
    );
    this.gameContainer.addChild(this.loadingProgressText);
    this.addChild(this.gameContainer);
  }

  public startLoad(): Promise<void> {
    this.loader
      .add("hv1", "../images/hv1_symbol.png")
      .add("hv2", "../images/hv2_symbol.png")
      .add("hv3", "../images/hv3_symbol.png")
      .add("hv4", "../images/hv4_symbol.png")
      .add("lv1", "../images/lv1_symbol.png")
      .add("lv2", "../images/lv2_symbol.png")
      .add("lv3", "../images/lv3_symbol.png")
      .add("lv4", "../images/lv4_symbol.png")
      .add("spin", "../images/spin_button.png");

    this.loader.load(this.onLoadComplete.bind(this));
    this.loader.onProgress.add(this.progressUpdate.bind(this));
    return new Promise((resolve) => {
      this.loaderPromise = resolve;
    });
  }

  private progressUpdate(loader: PIXI.Loader, resource: PIXI.LoaderResource) {
    this.loadingProgressText.text = "" + loader.progress.toFixed(2) + " %";
    console.log("Loaded :::    ", resource.name);
  }

  protected onLoadComplete(): void {
    this.loadingProgressText.text = "100%";
    console.log("All resources loaded ...");
    this.loaderPromise();
  }
}
