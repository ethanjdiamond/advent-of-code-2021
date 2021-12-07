import { BingoCard } from "./bingo.ts";

const text = await Deno.readTextFile("./resources/input.txt");

const lines = text.split("\n");
const calledNumbers = lines[0].split(",").map((line) => parseInt(line));

let bingoCards = text
  .split("\n\n")
  .slice(1, -1)
  .map((numbers) => numbers.trim().split(/\s+/g))
  .map((numbers) => numbers.map((number) => parseInt(number)))
  .map((numbers) => new BingoCard(numbers));

for (const calledNumber of calledNumbers) {
  for (const bingoCard of bingoCards) {
    bingoCard.markNumber(calledNumber);
    if (bingoCards.length == 1 && bingoCard.hasWon) {
      console.log(
        `LOSER BINGO!!! Here's the proof: ${bingoCard.calculateProof()}`
      );
      Deno.exit(0);
    }
  }
  bingoCards = bingoCards.filter((bingoCard) => !bingoCard.hasWon);
}
