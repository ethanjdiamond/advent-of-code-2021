class Octopus {
  energyLevel = 0;
  flashed = false;

  constructor(energyLevel: number) {
    this.energyLevel = energyLevel;
  }

  reset() {
    this.energyLevel = 0;
    this.flashed = false;
  }
}

export class OctopusGrid {
  flashCount = 0;
  allFlashed = false;
  octopi: Octopus[][];

  constructor(file: string) {
    this.octopi = file
      .split("\n")
      .map((line) =>
        line.split("").map((character) => new Octopus(parseInt(character)))
      );
  }

  get width() {
    return this.octopi.length;
  }

  get height() {
    return this.octopi[0].length;
  }

  step() {
    this.increaseOctopusEnergy();
    this.triggerFlashes();
    this.resetIfNeeded();
  }

  private increaseOctopusEnergy() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.octopi[x][y].energyLevel += 1;
      }
    }
  }

  private triggerFlashes() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.flashIfNeeded(x, y);
      }
    }
  }

  private flashIfNeeded(x: number, y: number) {
    if (
      this.octopi[x][y].energyLevel <= 9 ||
      this.octopi[x][y].flashed == true
    ) {
      return;
    }

    this.octopi[x][y].flashed = true;

    const minX = Math.max(x - 1, 0);
    const maxX = Math.min(x + 1, this.width - 1);
    const minY = Math.max(y - 1, 0);
    const maxY = Math.min(y + 1, this.height - 1);
    for (let affectedX = minX; affectedX <= maxX; affectedX++) {
      for (let affectedY = minY; affectedY <= maxY; affectedY++) {
        if (affectedX == x && affectedY == y) {
          continue;
        }

        this.octopi[affectedX][affectedY].energyLevel += 1;
        this.flashIfNeeded(affectedX, affectedY);
      }
    }
  }

  private resetIfNeeded() {
    let flashCount = 0;
    for (let x = 0; x < this.octopi.length; x++) {
      for (let y = 0; y < this.octopi[x].length; y++) {
        if (this.octopi[x][y].flashed) {
          flashCount += 1;
          this.flashCount += 1;
          this.octopi[x][y].reset();
        }
      }
    }
    if (flashCount == this.width * this.height) {
      this.allFlashed = true;
    }
  }

  print() {
    console.log(
      this.octopi
        .map((octopusRow) => {
          return octopusRow
            .map((octopus) => `${octopus.energyLevel}`)
            .join(", ");
        })
        .join("\n")
    );
    console.log("");
  }
}
