use itertools::Itertools;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn main() {
    part1();
    part2();
}

fn part1() {
    let file = File::open("resources/input.txt").unwrap();
    let reader = BufReader::new(file);
    let output = reader
        .lines()
        .map(|x| x.unwrap().parse::<u32>().unwrap())
        .tuple_windows()
        .filter(|(a, b)| a < b)
        .count();

    println!("Part 1 answer is: {}", output)
}

fn part2() {
    let file = File::open("resources/input.txt").unwrap();
    let reader = BufReader::new(file);
    let output = reader
        .lines()
        .map(|x| x.unwrap().parse::<u32>().unwrap())
        .tuple_windows()
        .map(|(a, b, c)| a + b + c)
        .tuple_windows()
        .filter(|(a, b)| a < b)
        .count();

    println!("Part 2 answer is: {}", output)
}
