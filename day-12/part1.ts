import { CaveSystem } from "./caveSystem.ts";

const caveSystem = new CaveSystem(
  (await Deno.readTextFile("./resources/input.txt")).split("\n")
);

const paths = caveSystem.calculatePaths("part1");

console.log(`The answer is ${paths.length}`);
