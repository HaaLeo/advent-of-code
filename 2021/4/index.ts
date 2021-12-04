'use strict'
import { readInput, readInputByLine } from '../../lib/reader.ts';
import { fromFileUrl, join, dirname } from "https://deno.land/std@0.116.0/path/mod.ts";

interface ParsedInput {
    input: number[];
    boards: Board[];
}

interface Board {
    rows: number[][];
    columns: number[][]
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


const first = (parsedInput: ParsedInput) => {
    const { input, boards } = parsedInput;

    for (let index = 0; index < input.length; index++) {
        const drawedNumbers = input.slice(0, index + 1);

        for (const board of boards) {
            let boardWon = false;
            for (const row of board.rows) {
                boardWon = row.every(val => drawedNumbers.includes(val));

                if (boardWon) {
                    break;
                }
            }

            if (!boardWon) {
                for (const column of board.columns) {
                    boardWon = column.every(val => drawedNumbers.includes(val));

                    if (boardWon) {
                        break;
                    }
                }
            }

            if (boardWon) {
                let acc = 0;

                for (const row of board.rows) {
                    acc += row.filter(i => !drawedNumbers.includes(i)).reduce((acc, curr) => acc + curr, 0)
                }
                return acc * drawedNumbers[drawedNumbers.length - 1]
            }
        }
    }
}

const second = (parsedInput: ParsedInput) => {
    const { input, boards } = parsedInput;
    const winningBoardIndices: number[] = []
    const boardIndexToDrawedNumberMap: { [index: string]: number[] } = {}
    for (let index = 0; index < input.length; index++) {
        const drawedNumbers = input.slice(0, index + 1);

        for (const [boardIndex, board] of Object.entries(boards)) {
            if (winningBoardIndices.includes(parseInt(boardIndex))) {
                continue;
            }

            let boardWon = false;
            for (const row of board.rows) {
                boardWon = row.every(val => drawedNumbers.includes(val));

                if (boardWon) {
                    winningBoardIndices.push(parseInt(boardIndex));
                    boardIndexToDrawedNumberMap[boardIndex] = drawedNumbers
                    break;
                }
            }

            if (!boardWon) {
                for (const column of board.columns) {
                    boardWon = column.every(val => drawedNumbers.includes(val));

                    if (boardWon) {
                        winningBoardIndices.push(parseInt(boardIndex));
                        boardIndexToDrawedNumberMap[boardIndex] = drawedNumbers
                        break;
                    }
                }
            }
        }
    }

    const lastWinnningBoardIndex = winningBoardIndices[winningBoardIndices.length - 1]
    const drawedNumbers = boardIndexToDrawedNumberMap[lastWinnningBoardIndex]
    const lastBoard = boards[lastWinnningBoardIndex];
    let acc = 0;

    for (const row of lastBoard.rows) {
        acc += row.filter(i => !drawedNumbers.includes(i)).reduce((acc, curr) => acc + curr, 0)
    }
    return acc * drawedNumbers[drawedNumbers.length - 1]
}

const preprocessor = (content: string): ParsedInput => {
    const lines = content.split('\n');
    const input: number[] = lines.shift()?.split(',').map(i => parseInt(i, 10)) as number[];
    const boards: Board[] = []


    let currentBoard: Board = { rows: [], columns: [] };
    for (const boardRow of lines) {
        if (boardRow === '') {
            // New board
            if (currentBoard.columns.length === 5 && currentBoard.rows.length === 5) {
                boards.push({ ...currentBoard })
            }
            currentBoard = { rows: [], columns: [[], [], [], [], []] }
        } else {
            const parsedRow = boardRow.trim().split(' ').map(i => parseInt(i.trim(), 10)).filter(i => !isNaN(i))
            // Handle row
            currentBoard.rows.push(parsedRow)

            // handle column
            for (const [index, val] of Object.entries(parsedRow)) {
                currentBoard.columns[parseInt(index, 10)].push(val);
            }

        }
    }
    return { input, boards }

}
mainFunc()
