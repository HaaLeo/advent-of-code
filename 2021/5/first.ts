import { Line } from "./index.ts";

export const first = (lines: Line[]): number => {
    const pointsMap: { [point: string]: number } = {}

    for (const line of lines) {
        if (line.start.x === line.end.x) {
            let yDirection = 'neg';

            if (line.end.y - line.start.y > 0) {
                yDirection = 'pos'
            }

            let { y } = line.start;

            for (let step = 0; step <= Math.abs(line.start.y - line.end.y); step++) {
                const rawPoint = `${line.start.x},${y}`;
                if (step === 0 || step === Math.abs(line.start.y - line.end.y)) {
                    console.debug(rawPoint)
                }
                if (!(rawPoint in pointsMap)) {
                    pointsMap[rawPoint] = 0
                }
                pointsMap[rawPoint] += 1

                if (yDirection === 'pos') {
                    y += 1;
                } else {
                    y -= 1;
                }
            }

        } else if (line.start.y === line.end.y) {

            let xDirection = 'neg';

            if (line.end.x - line.start.x > 0) {
                xDirection = 'pos'
            }

            let { x } = line.start;

            for (let step = 0; step <= Math.abs(line.start.x - line.end.x); step++) {
                const rawPoint = `${x},${line.start.y}`;
                if (step === 0 || step === Math.abs(line.start.x - line.end.x)) {
                    console.debug(rawPoint)
                }
                if (!(rawPoint in pointsMap)) {
                    pointsMap[rawPoint] = 0
                }
                pointsMap[rawPoint] += 1

                if (xDirection === 'pos') {
                    x += 1;
                } else {
                    x -= 1;
                }
            }
        } else {
            // ignore for this task
            continue;
        }
    }

    let result = 0;
    for (const val of Object.values(pointsMap)) {
        if (val >= 2) {
            result++
        }
    }
    return result;
}
