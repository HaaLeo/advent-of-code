'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";
import { first } from "./first.ts";
import { second } from "./second.ts";

export interface Input {
    rows: number[][]
    width: number,
    height: number
}
const mainFunc = async () => {
    console.info('Hello Advent of Code')
    const filePath = join(dirname(fromFileUrl(import.meta.url)), 'input.txt')
    const content = await readInput(filePath)
    const input = preprocessor(content);
    // const input = preprocessor(`1163751742
    // 1381373672
    // 2136511328
    // 3694931569
    // 7463417111
    // 1319128137
    // 1359912421
    // 3125421639
    // 1293138521
    // 2311944581`);

    const firstResult = first(input);
    console.info(`The first result is "${firstResult}".`)

    const secondResult = second(input);
    console.info(`The second result is "${secondResult}".`)
}

const preprocessor = (content: string): Input => {

    const lines = content.split('\n');
    const rows: number[][] = []
    for (const line of lines) {
        const row = line.trim().split('').map(itm => parseInt(itm, 10))
        rows.push(row)
    }


    console.info(`Input consists of ${lines.length} entries.`)
    return { rows, width:rows[0].length, height: rows.length };
}
mainFunc()
