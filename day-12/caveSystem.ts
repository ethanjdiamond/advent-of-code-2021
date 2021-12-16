export class CaveSystem {
  connections: Map<string, string[]>;

  constructor(directions: string[]) {
    this.connections = directions.reduce((map, connection) => {
      const [a, b] = connection.split("-");
      map.set(a, (map.get(a) || []).concat(b));
      map.set(b, (map.get(b) || []).concat(a));
      return map;
    }, new Map<string, string[]>());

    this.connections.set("end", []);
    this.connections.forEach((_, key, map) =>
      map.set(
        key,
        map.get(key)!.filter((cave) => cave != "start")
      )
    );
  }

  calculatePaths(forPart: "part1" | "part2") {
    let isLegalAlgorithm: (cave: string, path: string[]) => boolean;
    switch (forPart) {
      case "part1":
        isLegalAlgorithm = (cave, path) =>
          cave == cave.toUpperCase() || !path.includes(cave);
        break;
      case "part2":
        isLegalAlgorithm = (cave, path) => {
          const lowerCaseCaves = path.filter(
            (pathCave) => pathCave == pathCave.toLowerCase()
          );

          return (
            cave == cave.toUpperCase() ||
            !path.includes(cave) ||
            new Set(lowerCaseCaves).size == lowerCaseCaves.length
          );
        };
        break;
    }

    return this.findPaths([["start"]], isLegalAlgorithm).filter(
      (path) => path[path.length - 1] == "end"
    );
  }

  private findPaths(
    paths: string[][],
    isLegal: (cave: string, path: string[]) => boolean
  ) {
    let newPaths: string[][] = [];

    for (const path of paths) {
      const currentCave = path[path.length - 1];
      const legalConnections = this.connections
        .get(currentCave)!
        .filter((connection) => isLegal(connection, path));

      if (legalConnections.length == 0) {
        newPaths.push(path);
        continue;
      }

      for (const connection of legalConnections) {
        const newPath = path.concat(connection);
        newPaths = newPaths.concat(this.findPaths([newPath], isLegal));
      }
    }

    return newPaths;
  }
}
