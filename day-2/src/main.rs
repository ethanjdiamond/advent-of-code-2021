use itertools::Itertools;
use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug)]
struct SubPosition {
    horizontal: i32,
    vertical: i32,
    aim: i32,
}

impl SubPosition {
    fn new() -> SubPosition {
        return SubPosition {
            horizontal: 0,
            vertical: 0,
            aim: 0,
        };
    }

    fn apply_command_v1(self, string: String) -> SubPosition {
        let command: (&str, &str) = string.split(' ').collect_tuple().unwrap();
        let direction = command.0;
        let scalar = command.1.parse::<i32>().unwrap();
        return match direction {
            "up" => SubPosition {
                horizontal: self.horizontal,
                vertical: self.vertical + -scalar,
                aim: self.aim,
            },
            "down" => SubPosition {
                horizontal: self.horizontal,
                vertical: self.vertical + scalar,
                aim: self.aim,
            },
            "forward" => SubPosition {
                horizontal: self.horizontal + scalar,
                vertical: self.vertical,
                aim: self.aim,
            },
            _ => panic!("Unknown command"),
        };
    }

    fn apply_command_v2(self, string: String) -> SubPosition {
        let command: (&str, &str) = string.split(' ').collect_tuple().unwrap();
        let direction = command.0;
        let scalar = command.1.parse::<i32>().unwrap();
        return match direction {
            "up" => SubPosition {
                horizontal: self.horizontal,
                vertical: self.vertical,
                aim: self.aim + -scalar,
            },
            "down" => SubPosition {
                horizontal: self.horizontal,
                vertical: self.vertical,
                aim: self.aim + scalar,
            },
            "forward" => SubPosition {
                horizontal: self.horizontal + scalar,
                vertical: self.vertical + (self.aim * scalar),
                aim: self.aim,
            },
            _ => panic!("Unknown command"),
        };
    }
}

fn main() {
    part1();
    part2();
}

fn part1() {
    let file = File::open("resources/input.txt").unwrap();
    let reader = BufReader::new(file);
    let output = reader
        .lines()
        .fold(SubPosition::new(), |current_position, command| {
            current_position.apply_command_v1(command.unwrap())
        });
    println!("The answer is {}", output.horizontal * output.vertical)
}

fn part2() {
    let file = File::open("resources/input.txt").unwrap();
    let reader = BufReader::new(file);
    let output = reader
        .lines()
        .fold(SubPosition::new(), |current_position, command| {
            current_position.apply_command_v2(command.unwrap())
        });
    println!("The answer is {}", output.horizontal * output.vertical)
}
