export class FishSimulation {
  private fish: number[];

  constructor(fish: number[]) {
    this.fish = fish;
  }

  simulateDay() {
    const newFish = [];
    for (const index in this.fish) {
      if (this.fish[index] == 0) {
        this.fish[index] = 6;
        newFish.push(8);
      } else {
        this.fish[index] -= 1;
      }
    }
    this.fish = this.fish.concat(newFish);
  }

  count(): number {
    return this.fish.length;
  }
}
