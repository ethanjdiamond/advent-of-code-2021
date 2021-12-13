import { Delimiter } from "./delimiter.ts";

const answer = (await Deno.readTextFile("./resources/input.txt"))
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
          return delimiter.errorValue;
        }
      }
    }
    return 0;
  })
  .reduce((sum, value) => sum + value, 0);

console.log(`This answer is ${answer}`);
