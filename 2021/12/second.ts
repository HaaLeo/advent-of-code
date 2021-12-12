
export const second = (paths: Map<string, string[]>): number => {
    let score = getPossiblePaths('start', [], paths).length;

    return score;
}

function getPossiblePaths(node: string, visited: string[], paths: Map<string, string[]>): string[][] {
    const nextVisited = [...visited, node];

    if (node === 'end') {
        return [nextVisited];
    }

    const possibles = paths.get(node);

    const result: string[][] = [];

    possibles?.forEach(nextNode => {

        if (nextNode.toLowerCase() == nextNode) {
            if (nextNode == 'start') {
                return;
            }

            const counts: { [key: string]: true } = {};
            let visitedTwice = false;

            nextVisited.forEach(cave => {
                if (cave.toLowerCase() != cave) {
                    return;
                }

                if (counts[cave]) {
                    visitedTwice = true;
                } else {
                    counts[cave] = true;
                }
            });

            if (visitedTwice && counts[nextNode]) {
                return;
            }

        }

        result.push(...getPossiblePaths(nextNode, nextVisited, paths))
    });

    return result;
}
