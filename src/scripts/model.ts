export interface IWinline {
  index: number;
  count: number;
  symbol: string;
  payout: number;
}

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
  private totalWin: number = 0;

  private paylines: number[][] = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [2, 2, 2, 2, 2],
    [0, 0, 1, 2, 2],
    [2, 2, 1, 0, 0],
    [0, 1, 2, 1, 0],
    [2, 1, 0, 1, 2],
  ];

  private payouts: any = {
    lv1: {
      "3": 2,
      "4": 5,
      "5": 10,
    },
    lv2: {
      "3": 1,
      "4": 2,
      "5": 5,
    },
    lv3: {
      "3": 1,
      "4": 2,
      "5": 3,
    },
    lv4: {
      "3": 1,
      "4": 2,
      "5": 3,
    },
    hv1: {
      "3": 10,
      "4": 20,
      "5": 50,
    },
    hv2: {
      "3": 5,
      "4": 10,
      "5": 20,
    },
    hv3: {
      "3": 5,
      "4": 10,
      "5": 15,
    },
    hv4: {
      "3": 5,
      "4": 10,
      "5": 15,
    },
  };

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  get totalWinAmount() {
    return this.totalWin;
  }

  public checkWinAmount(symbol: string, count: number) {
    return this.payouts[symbol][count.toString()];
  }

  get winningLines() {
    const winlineData: IWinline[] = [];
    const stopSymbols = this.stopSymbols;
    this.totalWin = 0;

    for (let i = 0; i < this.paylines.length; i++) {
      const line = this.paylines[i];
      const selectedSymbol = stopSymbols[0][line[0]];
      let traverseCount = 5;
      for (let j = 0; j < line.length; j++) {
        if (stopSymbols[j][line[j]] !== selectedSymbol) {
          traverseCount = j;
          break;
        }
      }
      if (traverseCount > 2) {
        let lineWin = this.payouts[selectedSymbol][traverseCount];
        this.totalWin += lineWin;
        winlineData.push({
          index: i + 1,
          count: traverseCount,
          symbol: selectedSymbol,
          payout: lineWin,
        });
      }
    }

    return winlineData;
  }

  get reelsetData() {
    return this.reelset;
  }

  get reelStopPositions() {
    return this.reelStops;
  }

  set reelstops(stops: number[]) {
    this.reelStops = stops;
    console.log("New Reel Stops  ::::    ", stops);
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
