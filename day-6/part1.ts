import { FishSimulation } from "./fishSimulation.ts";

const fish = (await Deno.readTextFile("./resources/input.txt"))
  .split(",")
  .map((string) => parseInt(string));

const simulation = new FishSimulation(fish);
for (let x = 0; x < 80; x++) {
  simulation.simulateDay();
}
console.log(`The number of fish is ${simulation.count()}`);
