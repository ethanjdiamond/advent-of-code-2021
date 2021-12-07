export class FishSimulation {
  private fishIndex = Array<number>(9).fill(0);

  constructor(fish: number[]) {
    for (const value of fish) {
      this.fishIndex[value] += 1;
    }
  }

  simulateDay() {
    const birthingFishCount = this.fishIndex[0];
    for (let x = 0; x < 8; x++) {
      this.fishIndex[x] = this.fishIndex[x + 1];
    }
    this.fishIndex[8] = birthingFishCount;
    this.fishIndex[6] += birthingFishCount;
  }

  count(): number {
    return this.fishIndex.reduce((sum, value) => {
      return sum + value;
    }, 0);
  }
}
