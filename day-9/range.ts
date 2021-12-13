export class Range {
  rowIndex: number;
  start: number;
  end: number;

  constructor(rowIndex: number, start: number, end: number) {
    this.rowIndex = rowIndex;
    this.start = start;
    this.end = end;
  }

  static rangesFromRow(rowIndex: number, row: string[]): Range[] {
    const ranges: Range[] = [];
    let rangeStart: number | null = null;
    for (const [index, value] of row.entries()) {
      if (rangeStart == null && value != "9") {
        rangeStart = index;
      }

      const nextItemIsEdge = index + 1 == row.length || row[index + 1] == "9";
      if (rangeStart != null && nextItemIsEdge) {
        ranges.push(new Range(rowIndex, rangeStart, index));
        rangeStart = null;
      }
    }
    return ranges;
  }

  connectsTo(range: Range): boolean {
    return (
      Math.abs(this.rowIndex - range.rowIndex) <= 1 &&
      this.end >= range.start &&
      this.start <= range.end
    );
  }
}
