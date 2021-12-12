class Signal {
  value: string;

  constructor(value: string) {
    this.value = value.split("").sort().join("");
  }

  get length() {
    return this.value.length;
  }

  equals(signal: Signal | null): boolean {
    return this.value === signal!.value;
  }

  charactersInCommonCount(signal: Signal | null): number {
    return this.value
      .split("")
      .filter((x) => signal!.value.split("").includes(x)).length;
  }

  contains(signal: Signal | null): boolean {
    return this.charactersInCommonCount(signal) == signal!.value.length;
  }
}

export class SegmentDisplay {
  signals: Signal[];
  solutions = Array<Signal | null>(10).fill(null);

  constructor(signals: string[]) {
    this.signals = signals.map((signal) => new Signal(signal));
    this.solve1();
    this.solve4();
    this.solve7();
    this.solve8();
    this.solve9();
    this.solve0();
    this.solve6();
    this.solve3();
    this.solve5();
    this.solve2();
  }

  translateSignals(signals: string[]): string {
    return signals
      .map((signal) => this.numberForSignal(signal))
      .map((number) => number.toString())
      .join("");
  }

  private numberForSignal(signal: string): number {
    return this.solutions.findIndex((solution) =>
      solution!.equals(new Signal(signal))
    );
  }

  private solve0() {
    this.solutions[0] = this.signals
      .filter((signal) => signal.length == 6)
      .filter((signal) => !signal.equals(this.solutions[9]))
      .filter((signal) => signal.contains(this.solutions[7]))[0];
  }

  private solve1() {
    this.solutions[1] = this.signals.filter((signal) => signal.length == 2)[0];
  }

  private solve2() {
    this.solutions[2] = this.signals
      .filter((signal) => signal.length == 5)
      .filter((signal) => !signal.equals(this.solutions[3]))
      .filter((signal) => !signal.equals(this.solutions[5]))[0];
  }

  private solve3() {
    this.solutions[3] = this.signals
      .filter((signal) => signal.length == 5)
      .filter((signal) => signal.contains(this.solutions[1]))[0];
  }

  private solve4() {
    this.solutions[4] = this.signals.filter((signal) => signal.length == 4)[0];
  }

  private solve5() {
    this.solutions[5] = this.signals
      .filter((signal) => signal.length == 5)
      .filter((signal) => !signal.equals(this.solutions[3]))
      .filter(
        (signal) => signal.charactersInCommonCount(this.solutions[6]) == 5
      )[0];
  }

  private solve6() {
    this.solutions[6] = this.signals
      .filter((signal) => signal.length == 6)
      .filter((signal) => !signal.equals(this.solutions[9]))
      .filter((signal) => !signal.equals(this.solutions[0]))[0];
  }

  private solve7() {
    this.solutions[7] = this.signals.filter((signal) => signal.length == 3)[0];
  }

  private solve8() {
    this.solutions[8] = this.signals.filter((signal) => signal.length == 7)[0];
  }

  private solve9() {
    this.solutions[9] = this.signals
      .filter((signal) => signal.length == 6)
      .filter((signal) => signal.contains(this.solutions[4]))[0];
  }
}
