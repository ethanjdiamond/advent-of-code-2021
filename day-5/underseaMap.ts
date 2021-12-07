interface Coordinate {
  x: number;
  y: number;
}

export class UnderseaMap {
  private size: number;
  private locations: number[][];

  constructor(size: number) {
    this.size = size;
    this.locations = [];
    for (let x = 0; x < this.size; x++) {
      this.locations.push(Array(size).fill(0));
    }
  }

  addLine(coordinate1: Coordinate, coordinate2: Coordinate) {
    const distance = Math.max(
      Math.abs(coordinate1.x - coordinate2.x),
      Math.abs(coordinate1.y - coordinate2.y)
    );
    const xStepDistance = (coordinate2.x - coordinate1.x) / distance;
    const yStepDistance = (coordinate2.y - coordinate1.y) / distance;

    for (let step = 0; step <= distance; step++) {
      const x = coordinate1.x + step * xStepDistance;
      const y = coordinate1.y + step * yStepDistance;
      this.locations[x][y] += 1;
    }
  }

  overlapCount(): number {
    return this.locations
      .flatMap((row) => row)
      .filter((location) => location > 1).length;
  }

  print() {
    for (let x = 0; x < this.size; x++) {
      console.log(JSON.stringify(this.locations[x]));
    }
  }
}
