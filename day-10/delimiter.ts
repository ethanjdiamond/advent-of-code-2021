export class Delimiter {
  startCharacter: string;
  endCharacter: string;
  errorValue: number;
  completionValue: number;

  constructor(
    startCharacter: string,
    endCharacter: string,
    errorValue: number,
    completionValue: number
  ) {
    this.startCharacter = startCharacter;
    this.endCharacter = endCharacter;
    this.errorValue = errorValue;
    this.completionValue = completionValue;
  }

  static forCharacter(character: string): Delimiter {
    return delimiterSet.filter(
      (delimiter) =>
        delimiter.startCharacter == character ||
        delimiter.endCharacter == character
    )[0];
  }
}

const delimiterSet = [
  new Delimiter("(", ")", 3, 1),
  new Delimiter("[", "]", 57, 2),
  new Delimiter("{", "}", 1197, 3),
  new Delimiter("<", ">", 25137, 4),
];
