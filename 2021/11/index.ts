'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";
import { first } from "./first.ts";
import { second } from "./second.ts";

export interface Grid { map: number[][]; width: number; height: number };

// Solution is taken from [Soma Zsják](https://github.com/sanraith/aoc2021/blob/main/src/solutions/day11.ts)
const mainFunc = async () => {
    console.info('Hello Advent of Code')
    const filePath = join(dirname(fromFileUrl(import.meta.url)), 'input.txt')
    const content = await readInput(filePath)
    const input = preprocessor(content);

    const firstResult = first(input);
    console.info(`The first result is "${firstResult}".`)

    const secondResult = second(input);
    console.info(`The second result is "${secondResult}".`)
}

const preprocessor = (content: string): Grid => {

    const map: number[][] = content.split('\n').map(line => line.split('').map(itm => parseInt(itm, 10)))

    return { map, width: map[0]?.length ?? 0, height: map.length };
}
mainFunc()
