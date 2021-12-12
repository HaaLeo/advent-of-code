'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";
import { first } from "./first.ts";
import { second } from "./second.ts";


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
    const paths = new Map<string, string[]>();

    content.split("\n").forEach(
        row => {
            const [start, end] = row.split('-');

            const addToStart = paths.get(start);

            if (addToStart === undefined) {
                paths.set(start, [end]);
            } else {
                addToStart.push(end);
            }

            const addToEnd = paths.get(end);

            if (addToEnd === undefined) {
                paths.set(end, [start]);
            } else {
                addToEnd.push(start);
            }
        }
    );

    return paths;
}
mainFunc()
