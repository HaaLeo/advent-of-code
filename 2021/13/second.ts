import { Input, Coordinate } from './index.ts'

export const second = (input: Input): number => {
    const { dots, folds } = input;
    let result = 0;
    let newDots: Coordinate[] = [...dots]

    for (const myFold of folds) {

        const [foldAxis, foldPos] = Object.entries(myFold)[0]
        newDots = [...fold(newDots, foldAxis, foldPos)]
    }

    visualize(newDots);

    return 0;
}


function fold(dots: Coordinate[], foldAxis: string, foldPos: number): Coordinate[] {
    const newDots: Coordinate[] = []
    if (foldAxis === 'x') {
        for (const dot of dots) {
            if (dot.x > foldPos) {
                const newX = foldPos - (dot.x - foldPos)

                if (!dots.find(coord => coord.x === newX && coord.y === dot.y)) {
                    newDots.push({ x: newX, y: dot.y })
                }
            } else {
                newDots.push(dot)
            }
        }
    } else if (foldAxis = 'y') {
        for (const dot of dots) {
            if (dot.y > foldPos) {
                const newY = foldPos - (dot.y - foldPos)

                if (!dots.find(coord => coord.y === newY && coord.x === dot.x)) {
                    newDots.push({ x: dot.x, y: newY })
                }
            } else {
                newDots.push(dot)
            }
        }
    } else {
        throw new Error(`unknown fold axis="${foldAxis}".`)
    }

    return newDots
}

function visualize(dots: Coordinate[]): void {
    let myDots = [...dots];

    myDots = myDots.sort((a, b) => a.x - b.x)
    myDots = myDots.sort((a, b) => a.y - b.y)

    let currY: number = myDots[0].y;
    let line = '';
    myDots.forEach((dot, index) => {

        let spaces = ''
        if (dot.y === currY) {
            for (let i = line.length; i < dot.x; i++) {
                spaces += ' '
            }
            line += spaces
            line += '#'
        }
        else {
            console.log(line)
            currY = myDots[index+1].y;
            line = ''
            for (let i = line.length; i < dot.x; i++) {
                spaces += ''
            }
            line += spaces
            line += '#'
        }
    })
    console.log(line)
}