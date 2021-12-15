import { Input } from './index.ts'

interface Node { index: [number, number], cost: number }
export const second = (input: Input): number => {
    const { rows, width: originalWidth, height: originalHeight } = input;
    const width = originalWidth * 5
    const height = originalHeight * 5
    let result = 0;

    const startNode: Node = {
        index: [0, 0],
        cost: 0
    };
    const visited: string[] = []
    let nodes: Node[] = [startNode]

    while (nodes.length > 0) {
        const currentNode = nodes.shift() as Node;

        const [x, y] = currentNode.index;
        // console.log(`${x}${y}`)
        if (x === width - 1 && y === width - 1) {
            result = currentNode.cost;
            break;
        }

        // Get candidates
        const candidateIndices = [[x + 1, y], [x, y + 1]];

        const candidateNodes: Node[] = []

        for (const [x, y] of candidateIndices) {
            if (x >= 0 && x < width && y >= 0 && y < height && !visited.includes(`${x}${y}`)) {
                let xOffset = 0
                let yOffset = 0
                let newX = x;
                let newY = y;
                if (x >= originalWidth) {
                    xOffset = Math.floor(x / originalWidth)
                    newX = x - (xOffset * originalWidth)
                }
                if (y >= originalHeight) {
                    yOffset = Math.floor(y / originalHeight)
                    newY = y - (yOffset * originalHeight)
                }

                let newCost = rows[newY][newX] + xOffset + yOffset;
                newCost = newCost > 9 ? newCost - 9 : newCost

                candidateNodes.push({ cost: currentNode.cost + newCost, index: [x, y] })
            }
        }



        visited.push(`${x}${y}`)
        for (const nextNode of candidateNodes) {
            const existingIndex = nodes.findIndex(node => node.index[0] === nextNode.index[0] && node.index[1] === nextNode.index[1])
            if (existingIndex === -1) {
                nodes.push(nextNode)
            } else if (nodes[existingIndex].cost > nextNode.cost) {
                nodes.splice(existingIndex, 1, nextNode)
            }
        }

        nodes = nodes.sort((a, b) => a.cost - b.cost)
    }


    return result;
}
