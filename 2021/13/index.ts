'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";
import { first } from "./first.ts";
import { second } from "./second.ts";

export interface Coordinate {
    x: number;
    y: number;
}
export interface Input {
    dots: Coordinate[]
    folds: Partial<Coordinate>[]
}
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

const preprocessor = (content: string): Input => {

    const lines = content.split('\n');
    const coords: Coordinate[] = []
    const folds: Partial<Coordinate>[] = []

    for (const line of lines) {
        if (line.includes(',')) {
            const [x, y] = line.split(',').map(itm => parseInt(itm, 10))
            coords.push({ x, y })
        } else if (line.includes('fold along ')) {
            const [coord, value] = line.split('fold along ')[1].split('=')
            folds.push({ [coord]: parseInt(value, 10) })
        }
    }


    console.info(`Input consists of ${lines.length} entries.`)
    return {folds, dots: coords};
}
mainFunc()
