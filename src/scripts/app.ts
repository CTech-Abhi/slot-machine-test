// app.ts

import * as PIXI from "pixi.js";
import { slotCreator } from "./slotCreator";

interface EngineParams {
  containerId: string;
  canvasW: number;
  canvasH: number;
  fpsMax: number;
}

class Engine {
  public container: HTMLElement;
  public loader: PIXI.Loader;
  public renderer: PIXI.Renderer;
  public stage: PIXI.Container;
  public graphics: PIXI.Graphics;

  constructor(params: EngineParams) {
    this.loader = PIXI.Loader.shared;
    this.renderer = PIXI.autoDetectRenderer({
      width: params.canvasW,
      height: params.canvasH,
      antialias: true,
      backgroundColor: 0xbcdf59,
    }) as PIXI.Renderer;
    this.stage = new PIXI.Container();
    this.graphics = new PIXI.Graphics();

    this.container = params.containerId
      ? document.getElementById(params.containerId) || document.body
      : document.body;
    this.container.appendChild(this.renderer.view);
  } // constructor
} // Engine

const engineProps = {
  containerId: "game",
  canvasW: 1080,
  canvasH: 720,
  fpsMax: 60,
};
const engine = new Engine(engineProps);

// const mainButton = PIXI.Sprite.from("images/spin_button.png");

// ==============
// === STATES ===
// ==============

window.onload = load;
window.addEventListener("resize", resize);
resize();

function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

  engine.stage.scale.x = w / engineProps.canvasW;
  engine.stage.scale.y = h / engineProps.canvasH;

  engine.renderer.resize(w, h);
}

function load() {
  showIntroScreen();
  render();
} // load

/* function resizeMachine() {
  engine.stage.width = window.innerWidth;
  engine.stage.height = window.innerHeight;
} */

function showIntroScreen() {
  console.log("DEMO STARTED ......");
  engine.stage.addChild(new slotCreator());
}

function render() {
  requestAnimationFrame(render);
  /* ***************************** */
  /* Render your Game Objects here */
  /* ***************************** */
  engine.renderer.render(engine.stage);
} // render
