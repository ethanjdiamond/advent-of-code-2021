function wrap(value: number, max: number) {
  if (value < 0) {
    return max + (value % max);
  } else {
    return value % max;
  }
}

class SeaCucumber {
  direction: "down" | "right";
  markedToMove = false;

  constructor(direction: "down" | "right") {
    this.direction = direction;
  }
}

export class SeaCucumbers {
  cucumberMap: Array<Array<SeaCucumber | null>> = [];
  width: number;
  height: number;

  constructor(inputFile: string) {
    for (const line of inputFile.split("\n").reverse()) {
      this.cucumberMap.push([]);
      for (const character of line.split("")) {
        let mapValue: SeaCucumber | null;
        switch (character) {
          case ">":
            mapValue = new SeaCucumber("right");
            break;
          case "v":
            mapValue = new SeaCucumber("down");
            break;
          case ".":
            mapValue = null;
            break;
          default:
            console.log(`Bad character: ${character}`);
            Deno.exit(1);
        }
        this.cucumberMap[this.cucumberMap.length - 1].push(mapValue);
      }
    }

    this.width = this.cucumberMap[0].length;
    this.height = this.cucumberMap.length;
  }

  step(): "changed" | "did not change" {
    const previousMap = JSON.stringify(this.cucumberMap);

    this.markRightCucumbers();
    this.moveMarkedCucumbers();

    this.markDownCucumbers();
    this.moveMarkedCucumbers();

    return previousMap == JSON.stringify(this.cucumberMap)
      ? "did not change"
      : "changed";
  }

  private get(x: number, y: number): SeaCucumber | null {
    return this.cucumberMap[wrap(y, this.height)][wrap(x, this.width)];
  }

  private set(x: number, y: number, value: SeaCucumber | null) {
    this.cucumberMap[wrap(y, this.height)][wrap(x, this.width)] = value;
  }

  private markRightCucumbers() {
    for (let x = this.width - 1; x >= 0; x--) {
      for (let y = 0; y < this.height; y++) {
        if (
          this.get(x, y) instanceof SeaCucumber &&
          this.get(x, y)!.direction == "right" &&
          this.get(x + 1, y) == null
        ) {
          this.get(x, y)!.markedToMove = true;
        }
      }
    }
  }

  private markDownCucumbers() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (
          this.get(x, y) instanceof SeaCucumber &&
          this.get(x, y)!.direction == "down" &&
          this.get(x, y - 1) == null
        ) {
          this.get(x, y)!.markedToMove = true;
        }
      }
    }
  }

  private moveMarkedCucumbers() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.get(x, y)?.markedToMove) {
          this.get(x, y)!.markedToMove = false;

          switch (this.get(x, y)!.direction) {
            case "right": {
              this.set(x + 1, y, this.get(x, y));
              this.set(x, y, null);
              break;
            }
            case "down": {
              this.set(x, y - 1, this.get(x, y));
              this.set(x, y, null);
              break;
            }
          }
        }
      }
    }
  }

  print(): string {
    let output = "";
    for (let y = this.height - 1; y >= 0; y--) {
      for (let x = 0; x < this.width; x++) {
        switch (this.get(x, y)?.direction) {
          case "right":
            output += ">";
            break;
          case "down":
            output += "v";
            break;
          default:
            output += ".";
            break;
        }
      }
      output += "\n";
    }
    return output;
  }
}
