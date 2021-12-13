import { OctopusGrid } from "./octopus.ts";

const octopusGrid = new OctopusGrid(
  await Deno.readTextFile("./resources/input.txt")
);

for (let x = 0; x < 100; x++) {
  octopusGrid.step();
}

console.log(`The answer is ${octopusGrid.flashCount}`);
