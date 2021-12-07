interface Coordinate {
  x: number;
  y: number;
}

interface BingoCardNumber {
  value: number;
  marked: boolean;
}

export class BingoCard {
  hasWon = false;
  private board: BingoCardNumber[];
  private lastMarkedNumber?: BingoCardNumber;

  constructor(numbers: number[]) {
    this.board = numbers.map((number) => {
      return { value: number, marked: false };
    });
  }

  markNumber(number: number) {
    if (this.hasWon) {
      return;
    }

    this.board
      .filter((bingoNumber) => bingoNumber.value == number)
      .forEach((bingoNumber) => {
        bingoNumber.marked = true;
        this.lastMarkedNumber = bingoNumber;
      });

    this.hasWon = this.checkWin();
  }

  numberAt(coordinate: Coordinate) {
    return this.board[coordinate.x * 5 + coordinate.y];
  }

  private checkWin(): boolean {
    for (let x = 0; x < 5; x++) {
      if (
        [0, 1, 2, 3, 4]
          .map((y) => this.numberAt({ x: x, y: y }))
          .filter((number) => number.marked).length == 5
      ) {
        return true;
      }

      if (
        [0, 1, 2, 3, 4]
          .map((y) => this.numberAt({ x: y, y: x }))
          .filter((number) => number.marked).length == 5
      ) {
        return true;
      }
    }

    if (
      [0, 1, 2, 3, 4]
        .map((x) => this.numberAt({ x: x, y: x }))
        .filter((number) => number.marked).length == 5
    ) {
      return true;
    }

    if (
      [0, 1, 2, 3, 4]
        .map((x) => this.numberAt({ x: x, y: 4 - x }))
        .filter((number) => number.marked).length == 5
    ) {
      return true;
    }

    return false;
  }

  calculateProof(): number {
    const unmarkedNumberSum = this.board
      .filter((number) => number.marked != true)
      .reduce((sum, number) => {
        return sum + number.value;
      }, 0);

    const lastMarkedValue = this.lastMarkedNumber?.value ?? 0;

    return unmarkedNumberSum * lastMarkedValue;
  }
}
