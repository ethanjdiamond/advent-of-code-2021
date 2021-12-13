import { Delimiter } from "./delimiter.ts";

const scores = (await Deno.readTextFile("./resources/input.txt"))
  .split("\n")
  .map<number>((line) => {
    const stack: string[] = [];
    for (const character of line.split("")) {
      const delimiter = Delimiter.forCharacter(character);
      if (delimiter.startCharacter == character) {
        stack.push(delimiter.startCharacter);
      } else if (delimiter.endCharacter == character) {
        const lastCharacter = stack.pop();
        if (lastCharacter != delimiter.startCharacter) {
          return 0;
        }
      }
    }
    return stack
      .map((character) => Delimiter.forCharacter(character))
      .reverse()
      .reduce((score, delimiter) => {
        return score * 5 + delimiter.completionValue;
      }, 0);
  })
  .filter((score) => score != 0)
  .sort((a, b) => a - b);

console.log(`This answer is ${scores[Math.ceil(scores.length / 2) - 1]}`);
