import { Range } from "./range.ts";
import { Basin } from "./basin.ts";

// Map
const answer = (await Deno.readTextFile("./resources/input.txt"))
  .split("\n")
  .map((row) => row.split(""))
  .map((row, index) => Range.rangesFromRow(index, row))
  .flatMap((ranges) => ranges)
  .reduce((basins: Basin[], range) => {
    const connectedBasins: Basin[] = [];
    const unconnectedBasins: Basin[] = [];

    for (const basin of basins) {
      if (basin.connectsTo(range)) {
        connectedBasins.push(basin);
      } else {
        unconnectedBasins.push(basin);
      }
    }

    if (connectedBasins.length == 0) {
      return Array<Basin>().concat([new Basin([range])], unconnectedBasins);
    } else if (connectedBasins.length == 1) {
      connectedBasins[0].addRange(range);
      return Array<Basin>().concat([connectedBasins[0]], unconnectedBasins);
    } else {
      const mergedBasin = Basin.merge(connectedBasins);
      mergedBasin.addRange(range);
      return Array<Basin>().concat([mergedBasin], unconnectedBasins);
    }
  }, [])
  .sort((basin1, basin2) => basin2.size - basin1.size)
  .slice(0, 3)
  .reduce((product, basin) => product * basin.size, 1);

console.log(`This answer is ${answer}`);
