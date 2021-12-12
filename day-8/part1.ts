const outputs = (await Deno.readTextFile("./resources/input.txt"))
  .split("\n")
  .map((line) => line.split(" | ")[1].split(" "))
  .flatMap((outputs) => outputs)
  .filter((output) => [2, 3, 4, 7].includes(output.length));

console.log(`The answer is ${outputs.length}`);
