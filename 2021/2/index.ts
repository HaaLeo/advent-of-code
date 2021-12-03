'use strict'
import { readInput } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";


const mainFunc = async () => {
    console.info('Hello Advent of Code')
    const filePath = join(dirname(fromFileUrl(import.meta.url)), 'input.txt')
    const content = await readInput(filePath)

    const firstResult = first(content);
    console.info(`The first result is "${firstResult}".`)

    const secondResult = second(content);
    console.info(`The first result is "${secondResult}".`)
}


const first = (content: string) => {
    let horizontal = 0;
    let depth = 0;

    for (const entry of content.split('\n')) {
        const [command, val] = entry.split(' ');
        if (command === 'forward') {
            horizontal += parseInt(val, 10)
        } else if (command === 'down') {
            depth += parseInt(val, 10)
        } else if (command === 'up') {
            depth -= parseInt(val, 10)
        }
    }

    const result = horizontal * depth;
    return result;
}

const second = (content: string) => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;

    for (const entry of content.split('\n')) {
        const [command, val] = entry.split(' ');
        const value = parseInt(val, 10);

        if (command === 'forward') {
            horizontal += value
            depth += (aim * value)
        } else if (command === 'down') {
            aim += value
        } else if (command === 'up') {
            aim -= value
        } else {
            console.error('unknown command')
        }
    }

    const result = horizontal * depth;
    return result;
}

mainFunc()
