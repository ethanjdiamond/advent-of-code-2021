const map = (await Deno.readTextFile("./resources/input.txt"))
  .split("\n")
  .map((row) => row.split(""));

const mapWidth = map.length;
const mapHeight = map[0].length;

const lowPoints = [];
for (let x = 0; x < mapWidth; x++) {
  for (let y = 0; y < mapHeight; y++) {
    const higherPoints = [
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
    ].filter((coordinate) => {
      return (
        coordinate.x < 0 ||
        coordinate.x >= mapWidth ||
        coordinate.y < 0 ||
        coordinate.y >= mapHeight ||
        parseInt(map[x][y]) < parseInt(map[coordinate.x][coordinate.y])
      );
    }).length;

    if (higherPoints == 4) {
      lowPoints.push({ x: x, y: y });
    }
  }
}

const answer = lowPoints
  .map((lowPoint) => parseInt(map[lowPoint.x][lowPoint.y]) + 1)
  .reduce((sum, score) => sum + score, 0);

console.log(`The answer is ${answer}`);
