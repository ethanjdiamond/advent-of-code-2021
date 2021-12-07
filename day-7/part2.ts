import { movementCost } from "./helpers.ts";

const positions = (await Deno.readTextFile("./resources/input.txt"))
  .split(",")
  .map((string) => parseInt(string));

let bestLocation = 0;
let bestDistance = null;
for (let location = 0; location < Math.max(...positions); location++) {
  const distanceTraveled = positions
    .map((position) => movementCost(Math.abs(position - location)))
    .reduce((sum, position) => sum + position);

  if (bestDistance == null || distanceTraveled < bestDistance) {
    bestLocation = location;
    bestDistance = distanceTraveled;
  }
}

console.log(`The answer is ${bestDistance} at location ${bestLocation}`);
