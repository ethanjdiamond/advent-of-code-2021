package main

import (
	"io/ioutil"
	"strconv"
	"strings"
)

func getLines(filepath string) []string {
	input, err := ioutil.ReadFile(filepath)
	if err != nil {
		panic(err)
	}
	return strings.Split(string(input), "\n")
}

func mostCommonBitAtIndex(lines []string, index int) byte {
	count := 0
	for _, line := range lines {
		switch line[index] {
		case '0':
			count -= 1
		case '1':
			count += 1
		default:
			panic("Unexpected bit found")
		}
	}

	if count < 0 {
		return '0'
	} else {
		return '1'
	}
}

func convertBitstringToInt(bitString string) int64 {
	int, err := strconv.ParseInt(bitString, 2, 64)
	if err != nil {
		panic(err)
	}
	return int
}

func filterLines(bit byte, index int, lines []string) []string {
	var newLines []string
	for _, line := range lines {
		if line[index] == bit {
			newLines = append(newLines, line)
		}
	}
	return newLines
}

func oppositeBit(bit byte) byte {
	if bit == '0' {
		return '1'
	} else if bit == '1' {
		return '0'
	} else {
		panic("Tried to flip a non 0 or 1 bit")
	}
}
