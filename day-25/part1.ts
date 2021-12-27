import { SeaCucumbers } from "./seaCucumbers.ts";

const seaCucumbers = new SeaCucumbers(
  await Deno.readTextFile("./resources/input.txt")
);

for (let x = 1; true; x++) {
  if (seaCucumbers.step() == "did not change") {
    console.log(`The answer is ${x}`);
    break;
  }
}
