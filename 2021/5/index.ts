'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";
import { first } from "./first.ts";
import { second } from "./second.ts";

export interface Coordinate {
    x: number;
    y: number;
}

export interface Line{
    start: Coordinate;
    end: Coordinate;
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


const preprocessor = (content: string): any => {

    const rawLines = content.split('\n')
    // const rawLines = exampleInput.split('\n')
    const lines: Line[] = rawLines.map((rawLine)=> {
        const [rawStart, rawEnd] = rawLine.split(' -> ');
        const [xStart, yStart] = rawStart.split(',');
        const [xEnd, yEnd] = rawEnd.split(',');


        return {
            start: {
                x: parseInt(xStart,10),
                y: parseInt(yStart,10)
            },
            end: {
                x: parseInt(xEnd,10),
                y: parseInt(yEnd,10)

            }
        }
    })
    console.info(`Input consists of ${lines.length} rows.`)
    return lines
}
mainFunc()
