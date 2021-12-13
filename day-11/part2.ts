import { OctopusGrid } from "./octopus.ts";

const octopusGrid = new OctopusGrid(
  await Deno.readTextFile("./resources/input.txt")
);

let step = 0;
while (true) {
  octopusGrid.step();
  step += 1;
  if (octopusGrid.allFlashed) {
    break;
  }
}

console.log(`The answer is ${step}`);
