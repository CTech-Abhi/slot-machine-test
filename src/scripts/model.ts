export class Model {
  private static instance: Model;
  private reelset: string[][] = [
    [
      "hv2",
      "lv3",
      "lv3",
      "hv1",
      "hv1",
      "lv1",
      "hv1",
      "hv4",
      "lv1",
      "hv3",
      "hv2",
      "hv3",
      "lv4",
      "hv4",
      "lv1",
      "hv2",
      "lv4",
      "lv1",
      "lv3",
      "hv2",
    ],
    [
      "hv1",
      "lv2",
      "lv3",
      "lv2",
      "lv1",
      "lv1",
      "lv4",
      "lv1",
      "lv1",
      "hv4",
      "lv3",
      "hv2",
      "lv1",
      "lv3",
      "hv1",
      "lv1",
      "lv2",
      "lv4",
      "lv3",
      "lv2",
    ],
    [
      "lv1",
      "hv2",
      "lv3",
      "lv4",
      "hv3",
      "hv2",
      "lv2",
      "hv2",
      "hv2",
      "lv1",
      "hv3",
      "lv1",
      "hv1",
      "lv2",
      "hv3",
      "hv2",
      "hv4",
      "hv1",
      "lv2",
      "lv4",
    ],
    [
      "hv2",
      "lv2",
      "hv3",
      "lv2",
      "lv4",
      "lv4",
      "hv3",
      "lv2",
      "lv4",
      "hv1",
      "lv1",
      "hv1",
      "lv2",
      "hv3",
      "lv2",
      "lv3",
      "hv2",
      "lv1",
      "hv3",
      "lv2",
    ],
    [
      "lv3",
      "lv4",
      "hv2",
      "hv3",
      "hv4",
      "hv1",
      "hv3",
      "hv2",
      "hv2",
      "hv4",
      "hv4",
      "hv2",
      "lv2",
      "hv4",
      "hv1",
      "lv2",
      "hv1",
      "lv2",
      "hv4",
      "lv4",
    ],
  ];
  private reelStops: number[] = [18, 9, 2, 0, 12];

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  get reelsetData() {
    return this.reelset;
  }

  get reelStopPositions() {
    return this.reelStops;
  }

  get stopSymbols(): string[][] {
    let symbols = [];
    for (let i = 0; i < this.reelStops.length; i++) {
      let stopPosition = this.reelStops[i];
      let reel = this.reelset[i];
      let roundedStopPositions = [
        stopPosition,
        (stopPosition + 1) % reel.length,
        (stopPosition + 2) % reel.length,
      ];
      symbols.push([
        reel[roundedStopPositions[0]],
        reel[roundedStopPositions[1]],
        reel[roundedStopPositions[2]],
      ]);
    }
    return symbols;
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Model {
    if (!Model.instance) {
      Model.instance = new Model();
    }

    return Model.instance;
  }
}
