
export const second = (map: number[][]): number => {
    let basins = []

    for (let [strRowIndex, row] of Object.entries(map)) {
        let rowIndex = parseInt(strRowIndex, 10)
        for (const [i, loc] of Object.entries(row)) {
            const locIndex = parseInt(i, 10);

            if (isLowPoint(row, locIndex, map[rowIndex - 1], map[rowIndex + 1])) {
                const basin = getBasinSize(map, rowIndex, locIndex, [])
                basins.push(basin);
            }
        }
    }
    const sorted = basins.sort((a, b) => b - a);

    const result= sorted[0] * sorted[1] * sorted[2]
    return result;
}

const isLowPoint = (row: number[], locIndex: number, prevRow?: number[], nextRow?: number[]): boolean => {

    const loc = row[locIndex]

    const above = prevRow ? prevRow[locIndex] : undefined;
    const below = nextRow ? nextRow[locIndex] : undefined;

    const before = row[locIndex - 1];
    const after = row[locIndex + 1];

    if (above !== undefined && above <= loc) {
        return false;
    }
    if (below !== undefined && below <= loc) {
        return false;
    }
    if (before !== undefined && before <= loc) {
        return false;
    }
    if (after !== undefined && after <= loc) {
        return false;
    }

    return true;
}

const getBasinSize = (map: number[][], startRowIndex: number, startlocIndex: number, checkedIndices: string[]): number => {
    const loc = map[startRowIndex][startlocIndex]
    const row = map[startRowIndex]
    const prevRow = map[startRowIndex - 1]
    const nextRow = map[startRowIndex + 1]

    const above = prevRow ? prevRow[startlocIndex] : undefined;
    const below = nextRow ? nextRow[startlocIndex] : undefined;

    const before = row[startlocIndex - 1];
    const after = row[startlocIndex + 1];

    let acc = 1;
    if (above !== undefined && above !== 9 && above > loc) {
        if (!checkedIndices.includes(`${startlocIndex},${startRowIndex - 1}`)) {
            acc += getBasinSize(map, startRowIndex - 1, startlocIndex, checkedIndices);
        }
    }
    if (below !== undefined && below !== 9 && below > loc) {
        if (!checkedIndices.includes(`${startlocIndex},${startRowIndex + 1}`)) {
            acc += getBasinSize(map, startRowIndex + 1, startlocIndex, checkedIndices);
        }
    }
    if (before !== undefined && before !== 9 && before > loc) {
        if (!checkedIndices.includes(`${startlocIndex - 1},${startRowIndex}`)) {
            acc += getBasinSize(map, startRowIndex, startlocIndex - 1, checkedIndices);
        }
    }
    if (after !== undefined && after !== 9 && after > loc) {
        if (!checkedIndices.includes(`${startlocIndex + 1},${startRowIndex}`)) {
            acc += getBasinSize(map, startRowIndex, startlocIndex + 1, checkedIndices);
        }
    }

    checkedIndices.push(`${startlocIndex},${startRowIndex}`)
    return acc;
}