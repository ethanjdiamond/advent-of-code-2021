package main

import "fmt"

func main() {
	part1()
	part2()
}

func part1() {
	lines := getLines("resources/input.txt")

	// Get bitstring
	var bitString string
	var bitString2 string
	for i := 0; i < len(lines[0]); i++ {
		char := mostCommonBitAtIndex(lines, i)
		bitString += string(char)
		bitString2 += string(oppositeBit(char))
	}

	// Convert to ints
	int1 := convertBitstringToInt(bitString)
	int2 := convertBitstringToInt(bitString2)

	// Print output
	fmt.Printf("The answer is %v\n", int1*int2)
}

func part2() {
	var lines []string

	// Get oxygen rating
	lines = getLines("resources/input.txt")
	for i := 0; i < len(lines[0]); i++ {
		if len(lines) == 1 {
			break
		}
		mostSignificantBit := mostCommonBitAtIndex(lines, i)
		lines = filterLines(mostSignificantBit, i, lines)
	}
	oxygenRating := convertBitstringToInt(lines[0])

	// Get C02 scrubber rating
	lines = getLines("resources/input.txt")
	for i := 0; i < len(lines[0]); i++ {
		if len(lines) == 1 {
			break
		}
		leastSignificantBit := oppositeBit(mostCommonBitAtIndex(lines, i))
		lines = filterLines(leastSignificantBit, i, lines)
	}
	c02Rating := convertBitstringToInt(lines[0])

	// Print output
	fmt.Printf("The answer is %v\n", oxygenRating*c02Rating)
}
