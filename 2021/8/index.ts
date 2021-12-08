'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";
import { first } from "./first.ts";
import { second } from "./second.ts";

export interface Display {
    input: string[];
    output: string[]
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

    const lines = content.split('\n');
    const displays: Display[] = [];

    for (const line of lines) {
        const [rawInput, rawOutput] = line.split(' | ');
        displays.push({
            input: rawInput.trim().split(' '),
            output: rawOutput.trim().split(' ')
        })
    }
    console.info(`Input consists of ${lines.length} entries.`)
    return displays;
}
mainFunc()
