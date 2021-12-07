import { UnderseaMap } from "./underseaMap.ts";

const answer = (await Deno.readTextFile("./resources/input.txt"))
  .split("\n")
  .map((line) => line.match(/(\d{1,3}),(\d{1,3}) -> (\d{1,3}),(\d{1,3})/))
  .map((match) => {
    return {
      coordinate1: {
        x: parseInt(match![1]),
        y: parseInt(match![2]),
      },
      coordinate2: {
        x: parseInt(match![3]),
        y: parseInt(match![4]),
      },
    };
  })
  .filter(
    (coordinates) =>
      coordinates.coordinate1.x == coordinates.coordinate2.x ||
      coordinates.coordinate1.y == coordinates.coordinate2.y
  )
  .reduce((map, coordinates) => {
    map.addLine(coordinates.coordinate1, coordinates.coordinate2);
    return map;
  }, new UnderseaMap(1000))
  .overlapCount();

console.log(`The answer is ${answer}`);
