'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";


const mainFunc = async () => {
    console.info('Hello Advent of Code')
    const filePath = join(dirname(fromFileUrl(import.meta.url)), 'input.txt')
    const content = await readInput(filePath)
    const input = content.split('\n')

    const firstResult = first(input);
    console.info(`The first result is "${firstResult}".`)

    const secondResult = second(input);
    console.info(`The second result is "${secondResult}".`)
}


const first = (input: string[]) => {
    const positionMap: { [index: string]: { zeros: number; ones: number } } = {};

    for (const binNum of input) {
        for (const [index, digit] of Object.entries(binNum)) {
            if (!(index in positionMap)) {
                positionMap[index] = { zeros: 0, ones: 0 }
            }

            if (digit === '1') {
                positionMap[index].ones += 1
            } else if (digit === '0') {
                positionMap[index].zeros += 1
            } else {
                console.warn(`Unsupported value detected: digit="${digit}"."`);
            }
        }
    }

    let binGamma = '';
    let binEpsilon = '';
    for (const acc of Object.values(positionMap)) {
        if (acc.zeros > acc.ones) {
            binGamma += '0'
            binEpsilon += '1'
        } else {
            binGamma += '1'
            binEpsilon += '0'
        }
    }

    return parseInt(binGamma, 2) * parseInt(binEpsilon, 2)
}

const second = (input: string[]) => {
    const binNumLen = input[0].length;
    let oxyCandidates = [...input];
    let c02Candidates = [...input];

    for (let binNumIndex = 0; binNumIndex < binNumLen; binNumIndex++) {
        const oxyMap = buildMapForIndex(binNumIndex, oxyCandidates);
        const c02Map = buildMapForIndex(binNumIndex, c02Candidates);

        if (oxyMap['1'].length >= oxyMap['0'].length) {
            oxyCandidates = oxyMap['1']
        } else {
            oxyCandidates = oxyMap['0']
        }

        // Check always >0 because we prefer the smaller one.
        if (c02Map['1'].length >= c02Map['0'].length && c02Map['0'].length > 0) {
            c02Candidates = c02Map['0']
        } else if (c02Map['1'].length > 0) {
            c02Candidates = c02Map['1']
        }
    }

    if (oxyCandidates.length !== 1 || c02Candidates.length !== 1) {
        console.error('Something went wrong');
    }

    return parseInt(oxyCandidates[0], 2) * parseInt(c02Candidates[0], 2)
}

const buildMapForIndex = (digitIndex: number, input: string[]) => {

    const map: { [key: string]: string[] } = { '1': [], '0': [] }

    for (const binNum of input) {
        if (binNum[digitIndex] === '1') {
            map['1'].push(binNum)
        } else {
            map['0'].push(binNum)
        }
    }
    return map;
}

mainFunc()
