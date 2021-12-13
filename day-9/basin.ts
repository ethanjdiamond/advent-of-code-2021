import { Range } from "./range.ts";

export class Basin {
  ranges: Range[] = [];

  constructor(ranges?: Range[]) {
    this.ranges = ranges != undefined ? ranges : [];
  }

  static merge(basins: Basin[]): Basin {
    return new Basin(
      basins.map((basin) => basin.ranges).flatMap((ranges) => ranges)
    );
  }

  addRange(range: Range) {
    this.ranges.push(range);
  }

  connectsTo(range: Range): boolean {
    const connectedRanges = this.ranges.filter((basinRange) =>
      basinRange.connectsTo(range)
    );
    return connectedRanges.length > 0;
  }

  get size(): number {
    return this.ranges.reduce(
      (sum, range) => sum + (range.end - range.start + 1),
      0
    );
  }
}
