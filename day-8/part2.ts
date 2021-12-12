import { SegmentDisplay } from "./segmentDisplay.ts";

const answer = (await Deno.readTextFile("./resources/input.txt"))
  .split("\n")
  .map((line) => {
    const splits = line.split(" | ");
    return {
      inputs: splits[0].split(" "),
      outputs: splits[1].split(" "),
    };
  })
  .map((signals) => {
    return new SegmentDisplay(signals.inputs).translateSignals(signals.outputs);
  })
  .reduce((sum, output) => sum + parseInt(output), 0);

console.log(`This answer is ${answer}`);
