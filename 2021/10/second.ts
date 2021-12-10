
export const second = (lines: string[]): number => {
    const scores = [];
    const completeLines = lines.filter(line => completeLineFilter(line));

    for (const line of completeLines) {
        const openingStack: string[] = []
        for (const chunk of line) {
            if (['{', '[', '<', '('].includes(chunk)) {
                openingStack.push(chunk);
            } else {
                const expectedClosingChunk = getMatchingClosingChunk(openingStack[openingStack.length - 1]);

                if (expectedClosingChunk === chunk) {
                    openingStack.pop();
                } else {
                    throw new Error('Got corrupted line. But should not find one.');
                }
            }
        }

        const closingStack = getClosingStack(openingStack);
        let score = 0;
        for (const chunk of closingStack) {
            score *= 5
            score += getScore(chunk)
        }
        scores.push(score);
    }

    if (scores.length % 2 === 0) {
        throw new Error('Expected scores to be of odd length')
    }

    const result = scores.sort((a, b) => a - b)[(scores.length - 1) / 2]
    return result;
}

const getClosingStack = (openingStack: string[]): string[] => {
    const result = openingStack.reverse().map(chunk => getMatchingClosingChunk(chunk));

    return result;
}

const completeLineFilter = (line: string): boolean => {
    const openingStack = []
    for (const chunk of line) {
        if (['{', '[', '<', '('].includes(chunk)) {
            openingStack.push(chunk);
        } else {
            const expectedClosingChunk = getMatchingClosingChunk(openingStack[openingStack.length - 1]);

            if (expectedClosingChunk === chunk) {
                openingStack.pop();
            } else {
                return false;
            }
        }
    }
    return true;
}

const getScore = (chunk: string): number => {
    if (chunk === ')') {
        return 1;
    } else if (chunk === ']') {
        return 2;
    } else if (chunk === '}') {
        return 3;
    } else if (chunk === '>') {
        return 4;
    } else {
        throw new Error(`got unknown chunkg ${chunk}`);
    }
}

const getMatchingClosingChunk = (chunk: string): string => {

    if (chunk === '{') {
        return '}';
    } else if (chunk === '(') {
        return ')';
    } else if (chunk === '<') {
        return '>';
    } else if (chunk === '[') {
        return ']';
    } else {
        throw new Error(`got unknown chunkg ${chunk}`);
    }
}